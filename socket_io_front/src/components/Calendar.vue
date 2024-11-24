<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-09 19:41:59
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-24 12:14:21
 * @FilePath: \Front-end\Vue\Vue3\demo\axios上传文件和表单\element_ui_test\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 -->
<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { getAttendanceList, insertAttendance, absence } from "@/utils/api/user"
import { getCurrentPosition } from "@/utils/utilFn"
const request_data = ref([]);
const calendar = ref()
const currentDate = ref(new Date());
const userStore = useUserStore();
const dialogFormVisible = ref(false);
const selectDate = async (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
  const year = new Date(currentDate.value).getFullYear();
  const month = new Date(currentDate.value).getMonth() + 1;
  const attendance_year_month = "" + year + "-" + month;
  const userId = userStore.user.info.id;
  const params = {
    userId,
    attendance_year_month
  }
  const { data: resp } = await getAttendanceList(params);
  request_data.value = resp.data;
}
const description = ref('');
const absenceTime = ref();
const maxAbsenceDay = 3;//最大补卡时间
function showAbsence(time) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate() <= 9 ? "0" + now.getDate() : now.getDate();
  const date = `${year}-${month}-${day}`;
  // 打卡时间示例：假设打卡时间是一个具体的日期（可以替换为实际打卡时间）
  const punchTime = new Date(time);  // 替换为实际的打卡时间
  return date !== time && now.getTime() - punchTime.getTime() <= oneDayInMilliseconds * (maxAbsenceDay) && now.getTime() > punchTime.getTime()
}
function showdCheck(time) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate() <= 9 ? "0" + new Date().getDate() : new Date().getDate();
  const date = `${year}-${month}-${day}`;
  return date == time
}
async function absenceFn() {
  const userId = userStore.user.info.id;
  if (description.value == '') {
    ElMessage({
      message: "填写内容不能为空",
      type: 'warning',
    })
  }
  const params = {
    userId,
    description: description.value,
    time: absenceTime.value
  }
  const { data: resp } = await absence(params);
  dialogFormVisible.value = false
  if (resp.code == 200) {
    ElMessage({
      message: resp.message,
      type: 'success',
    })
    await getAttendanceListFn();
  }
}
function setAttendanceDay(cellDay) {
  absenceTime.value = cellDay;
}
async function insertAttendanceFn() {
  const { userLatitude, userLongitude, } = await getCurrentPosition()
  const userId = userStore.user.info.id;
  const params = {
    userId,
    userLatitude, userLongitude
  }
  const { data: resp } = await insertAttendance(params);
  if (resp.code == 200) {
    ElMessage({
      message: resp.message,
      type: 'success',
    })
  }
}
async function getAttendanceListFn() {
  const year = new Date(currentDate.value).getFullYear();
  const month = new Date(currentDate.value).getMonth() + 1;
  const attendance_year_month = "" + year + "-" + month;
  const userId = userStore.user.info.id;
  const params = {
    userId,
    attendance_year_month
  }
  const { data: resp } = await getAttendanceList(params);
  request_data.value = resp.data;
}
onMounted(async () => {
  await getAttendanceListFn();
})
</script>
<template>
  <el-calendar ref="calendar" v-model="currentDate" class="my-calendar">
    <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-year')">
          上一年
        </el-button>
        <el-button size="small" @click="selectDate('prev-month')">
          上一月
        </el-button>
        <el-button size="small" @click="selectDate('today')">今天</el-button>
        <el-button size="small" @click="selectDate('next-month')">
          下一月
        </el-button>
        <el-button size="small" @click="selectDate('next-year')">
          下一年
        </el-button>
      </el-button-group>
    </template>
    <template #date-cell="{ data }">
      <div @click="setAttendanceDay(data.day)" class="cell-center">
        <span class="day">{{ data.day.split("-")[2] }}</span>
        <span v-if="new Date(data.day).getTime() < Date.now() && !showdCheck(data.day)">
          <!-- 使用 find 方法找到对应日期的内容 -->
          {{
            (request_data.find(info => info.createdAt === data.day) || {}).text || '×'
          }}
        </span>
        <!-- && !(request_data.find(info => info.createdAt === data.day)) -->
        <span class="absence" v-if="showAbsence(data.day) &&
          ((request_data.find(info => info.createdAt === data.day))?.showAbsence || !request_data.find(info => info.createdAt === data.day))
        " @click="dialogFormVisible = true" title="点击按钮补卡">补</span>
        <span class="check" title="点击按钮打卡" v-if="showdCheck(data.day)" @click="insertAttendanceFn">打卡</span>
      </div>
      <el-dialog v-model="dialogFormVisible" title="补卡说明" width="500" @keydown.enter="absenceFn">
        <el-input v-model="description" autocomplete="off" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="absenceFn">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </el-calendar>
</template>


<style scoped>
.is-selected {
  color: #1989fa;
}

.my-calendar {
  color: #000;
}

.cell-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day {
  margin-bottom: 0.5rem;
}

.absence {
  display: inline-block;
  width: 2rem;
  text-align: center;
  margin-top: 2px;
  color: red;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 1px black;
}

.check {
  display: inline-block;
  width: 3rem;
  text-align: center;
  margin-top: 2px;
  color: skyblue;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 1px black;
}
</style>

<script setup lang="ts">
import { h, shallowRef } from 'vue'
import { useDialog } from '@lulu/vue/use-dialog'
import { useMessage } from '@lulu/vue/use-message'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/button/style.css'

const dialog = useDialog()
const message = useMessage()
const status = shallowRef('等待操作')

async function confirmDelete() {
  const confirmed = await dialog.confirm({
    title: '删除记录', content: '删除后无法恢复，确定继续吗？', confirmText: '删除',
  })
  status.value = confirmed ? '已确认删除' : '已取消删除'
}

function openCustom() {
  const count = shallowRef(0)
  const handle = dialog.open({
    title: '自定义内容',
    content: () => h('div', [
      h('p', `当前计数：${count.value}`),
      h(LuluButton, { onClick: () => { count.value += 1 } }, () => '增加'),
      h(LuluButton, { onClick: () => handle.close() }, () => '完成'),
    ]),
  })
  void handle.closed.then(() => { status.value = '自定义弹窗已关闭' })
}

async function confirmAsync() {
  let attempts = 0
  const confirmed = await dialog.confirm({
    title: '异步保存', content: '第一次保存模拟失败，再点一次确定即可成功。',
    async onConfirm() {
      await new Promise((resolve) => setTimeout(resolve, 700))
      if (attempts++ === 0) {
        message.error('消息提示也显示在弹窗内')
        throw new Error('保存失败，请重试。')
      }
    },
  })
  status.value = confirmed ? '保存成功' : '已取消保存'
}

async function showQueue() {
  const first = dialog.alert({ title: '第一条', content: '关闭后显示第二条。' })
  const second = dialog.alert({ title: '第二条', content: '同一宿主串行显示。' })
  await Promise.all([first, second])
  status.value = '队列已结束'
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <LuluButton @click="confirmDelete">确认删除</LuluButton>
    <LuluButton @click="openCustom">自定义弹窗</LuluButton>
    <LuluButton @click="confirmAsync">异步确认与重试</LuluButton>
    <LuluButton @click="showQueue">排队告知</LuluButton>
  </div>
  <p role="status" class="mt-3">{{ status }}</p>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import {
  LuluButton, LuluTable, LuluDatePicker, LuluForm, LuluFormItem, LuluInput,
  LuluMessageHost, LuluRate, LuluSlider, LuluSwitch, LuluTimeRangePicker,
  type TableColumn, type FormRules, type MessagePlacement, type SliderRangeValue,
} from '@lulu/vue'
import FamilyMessages from './FamilyMessages.vue'

const model = reactive({ email: '', year: '2026', time: ['22:00', '02:00'] as [string, string] })
const rules: FormRules = { email: value => typeof value === 'string' && value.endsWith('@example.com') ? undefined : '请使用 example.com 邮箱' }
const range = shallowRef<SliderRangeValue>([20, 80])
const rating = shallowRef(2.5)
const page = shallowRef(1)
const loading = shallowRef(false)
const empty = shallowRef(false)
const submitted = shallowRef('尚未提交')
const placement = shallowRef<MessagePlacement>('top')
const newOnTop = shallowRef(false)
const theme = shallowRef<'light' | 'dark'>('light')
const rows = [{ id: 1, name: 'Vue' }, { id: 2, name: 'TypeScript' }]
const columns: TableColumn<(typeof rows)[number]>[] = [{ key: 'name', label: '名称' }]
</script>

<template>
  <main class="family-contract mx-auto grid max-w-3xl gap-4 p-4" :data-lulu-theme="theme">
    <h1 class="m-0 text-xl">组件家族浏览器回归</h1>
    <div class="flex flex-wrap items-center gap-3">
      <LuluButton @click="theme = theme === 'light' ? 'dark' : 'light'">切换主题</LuluButton>
      <span>{{ theme }} · 局部主色 #7c3aed</span>
    </div>
    <section class="grid gap-3" aria-label="滑块与评分">
      <label>同轨道范围 <output id="range-value">{{ range.join(' – ') }}</output></label>
      <LuluSlider v-model="range" range start-label="范围起点" end-label="范围终点" />
      <label>星形评分 <output id="rating-value">{{ rating }}</output></label>
      <LuluRate v-model="rating" clearable label="浏览器评分" />
    </section>
    <LuluForm :model="model" :rules="rules" @finish="submitted = '校验通过'" @finish-failed="submitted = '校验失败'">
      <LuluFormItem name="email" label="邮箱" required>
        <LuluInput v-model="model.email" type="email" placeholder="name@example.com" />
      </LuluFormItem>
      <LuluFormItem name="year" label="年份">
        <LuluDatePicker v-model="model.year" picker="year" />
      </LuluFormItem>
      <LuluFormItem name="time" label="跨午夜时间范围">
        <LuluTimeRangePicker v-model="model.time" />
      </LuluFormItem>
      <div class="flex gap-2">
        <LuluButton native-type="submit">验证并提交</LuluButton>
        <LuluButton native-type="reset">重置表单</LuluButton>
        <output id="form-result" aria-live="polite">{{ submitted }}</output>
      </div>
    </LuluForm>
    <section class="grid gap-2" aria-label="表格组合">
      <div class="flex gap-3">
        <LuluSwitch v-model="loading">加载状态</LuluSwitch>
        <LuluSwitch v-model="empty">空数据</LuluSwitch>
        <output id="table-page">第 {{ page }} 页</output>
      </div>
      <LuluTable v-model:page="page" :rows="empty ? [] : rows" :columns="columns" row-key="id" :loading="loading" :pagination="{ total: 45 }" aria-label="浏览器数据表" />
    </section>
    <section class="grid gap-2" aria-label="消息配置">
      <div class="flex flex-wrap items-center gap-3">
        <label>消息位置 <select v-model="placement" aria-label="消息位置"><option v-for="position in ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']" :key="position">{{ position }}</option></select></label>
        <LuluSwitch v-model="newOnTop">新消息在前</LuluSwitch>
      </div>
      <LuluMessageHost :placement="placement" :new-on-top="newOnTop" :duration="0" :data-lulu-theme="theme">
        <FamilyMessages />
      </LuluMessageHost>
    </section>
  </main>
</template>

<style scoped>
.family-contract { --lulu-color-primary: #7c3aed; color: var(--lulu-color-text); background: var(--lulu-color-surface); font: 16px/1.5 system-ui, sans-serif; }
</style>

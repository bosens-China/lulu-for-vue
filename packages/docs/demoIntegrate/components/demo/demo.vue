<template>
  <section :id="props.title" class="code-box">
    <section class="code-box-demo">
      <slot></slot>
    </section>
    <section class="code-box-meta markdown">
      <div v-if="props.title" class="code-box-title">
        <a :href="`#${props.title}`">{{ props.title }}</a
        ><a
          class="edit-button"
          href="https://github.com/ant-design/ant-design/edit/master/components/button/demo/basic.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <edit-outlined />
        </a>
      </div>
      <div v-if="props.describe" class="code-box-description">
        <div>
          <p>
            {{ props.describe }}
          </p>
        </div>
      </div>
      <div class="code-box-actions">
        <a-tooltip :title="copyTitle">
          <snippets-outlined
            v-if="!isCopy"
            class="code-box-code-copy code-box-code-action"
            @click="onCopy"
          />
          <check-outlined
            v-else
            class="code-box-code-copy code-box-code-action"
            @mouseleave="onMouseleave"
          />
        </a-tooltip>

        <a-tooltip :title="title">
          <span class="code-expand-icon code-box-code-action" @click="open = !open">
            <img
              alt="expand code"
              :src="expand"
              :class="{
                'code-expand-icon-show': !open,
                'code-expand-icon-hide': open,
              }" />

            <img
              alt="expand code"
              :src="unexpand"
              :class="{
                'code-expand-icon-show': open,
                'code-expand-icon-hide': !open,
              }"
          /></span>
        </a-tooltip>
      </div>
    </section>
    <section class="highlight-wrapper" :class="{ 'highlight-wrapper-expand': open }">
      <div class="highlight">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="TypeScript">
            <div v-html="props.code"></div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="javaScript">
            <div v-html="props.codeJs"></div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import expand from '../../assets/expand.svg';
import unexpand from '../../assets/unexpand.svg';
import { SnippetsOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons-vue';
import copy from 'copy-text-to-clipboard';

const props = defineProps<{
  code: string;
  codeJs: string;
  sourceCode: string;
  sourceCodeJs: string;
  title: string;
  describe?: string;
}>();

const activeKey = ref<'1' | '2'>('1');

const open = ref(false);
const title = computed(() => (open.value ? '收起代码' : '显示代码'));

const isCopy = ref(false);
const copyTitle = computed(() => (isCopy.value ? '复制成功' : '复制代码'));
const onCopy = () => {
  isCopy.value = true;
  copy(activeKey.value === '1' ? props.sourceCode : props.sourceCodeJs);
  setTimeout(() => {
    isCopy.value = false;
  }, 3000);
};
// 鼠标移动走立即变更状态
const onMouseleave = () => {
  setTimeout(() => {
    isCopy.value = false;
  }, 300);
};
</script>

<style lang="less">
.highlight {
  line-height: 1.5;
}

.markdown img {
  max-width: calc(100% - 32px);
  max-height: 100%;
}

.markdown p > img {
  margin: 34px 0;
  box-shadow: 0 8px 20px #8fa8bf59;
}

.markdown p > img.markdown-inline-image {
  margin: 0;
  box-shadow: none;
}

.markdown h1 {
  margin-top: 8px;
  margin-bottom: 20px;
  color: #000000d9;
  font-weight: 500;
  font-size: 30px;
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
    Noto Sans, sans-serif, apple color emoji, segoe ui emoji, Segoe UI Symbol, noto color emoji,
    sans-serif;
  line-height: 38px;
}

.markdown h1 .subtitle {
  margin-left: 12px;
}

.markdown h2 {
  font-size: 24px;
  line-height: 32px;
}

.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  clear: both;
  margin: 1.6em 0 0.6em;
  color: #000000d9;
  font-weight: 500;
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
    Noto Sans, sans-serif, apple color emoji, segoe ui emoji, Segoe UI Symbol, noto color emoji,
    sans-serif;
}

.markdown h3 {
  font-size: 18px;
}

.markdown h4 {
  font-size: 16px;
}

.markdown h5 {
  font-size: 14px;
}

.markdown h6 {
  font-size: 12px;
}

.markdown hr {
  clear: both;
  height: 1px;
  margin: 56px 0;
  background: rgba(0, 0, 0, 0.06);
  border: 0;
}

.markdown p,
.markdown pre {
  margin: 1em 0;
}

.ant-row-rtl .markdown p,
.ant-row-rtl .markdown pre {
  direction: rtl;
  text-align: right;
}

.markdown ul > li {
  margin-left: 20px;
  padding-left: 4px;
  list-style-type: circle;
}

.rtl .markdown ul > li {
  margin-right: 20px;
  margin-left: 0;
  padding-right: 4px;
  padding-left: 0;
}

.markdown ul > li:empty {
  display: none;
}

.markdown ol > li {
  margin-left: 20px;
  padding-left: 4px;
  list-style-type: decimal;
}

.ant-row-rtl .markdown ol > li {
  margin-right: 20px;
  margin-left: 0;
  padding-right: 4px;
  padding-left: 0;
}

.markdown ul > li > p,
.markdown ol > li > p {
  margin: 0.2em 0;
}

.markdown code {
  margin: 0 1px;
  padding: 0.2em 0.4em;
  font-size: 0.9em;
  background: #f2f4f5;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 3px;
}

.markdown pre {
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  background: #f2f4f5;
  border-radius: 2px;
}

.markdown pre code {
  margin: 0;
  padding: 0;
  overflow: auto;
  color: #000000d9;
  font-size: 13px;
  direction: ltr;
  text-align: left;
  background: #f5f5f5;
  border: none;
}

.markdown strong,
.markdown b {
  font-weight: 500;
}

.markdown > table {
  width: 100%;
  margin: 8px 0 16px;
  direction: ltr;
  empty-cells: show;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-collapse: collapse;
  border-spacing: 0;
}

.markdown > table th {
  color: #5c6b77;
  font-weight: 500;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.02);
}

.markdown > table th,
.markdown > table td {
  padding: 16px 24px;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.markdown table td > a:not(:last-child) {
  margin-right: 0 !important;
}

.markdown table td > a:not(:last-child):after {
  position: relative !important;
}

.markdown blockquote {
  margin: 1em 0;
  padding-left: 0.8em;
  color: #00000073;
  font-size: 90%;
  border-left: 4px solid rgba(0, 0, 0, 0.06);
}

.rtl .markdown blockquote {
  padding-right: 0.8em;
  padding-left: 0;
  border-right: 4px solid rgba(0, 0, 0, 0.06);
  border-left: none;
}

.markdown blockquote p {
  margin: 0;
}

.markdown .anchor {
  margin-left: 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.rtl .markdown .anchor {
  margin-right: 8px;
  margin-left: 0;
}

.markdown .waiting {
  color: #ccc;
  cursor: not-allowed;
}

.markdown a.edit-button {
  display: inline-block;
  margin-left: 8px;
  text-decoration: none;
}

.rtl .markdown a.edit-button {
  margin-right: 8px;
  margin-left: 0;
  transform: rotateY(180deg);
}

.markdown a.edit-button .anticon {
  display: block;
  color: #00000073;
  font-size: 16px;
  transition: all 0.3s;
}

.markdown a.edit-button .anticon:hover {
  color: #000000d9;
}

.markdown h1:hover .anchor,
.markdown h2:hover .anchor,
.markdown h3:hover .anchor,
.markdown h4:hover .anchor,
.markdown h5:hover .anchor,
.markdown h6:hover .anchor {
  display: inline-block;
  opacity: 1;
}

.markdown > br,
.markdown > p > br {
  clear: both;
}

.markdown.api-container table {
  display: block;
  margin: 2em 0;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 13px;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  line-height: 1.5715;
  border: 0;
  -webkit-overflow-scrolling: touch;
}

.markdown.api-container table th,
.markdown.api-container table td {
  padding: 12px;
  border-color: #0000000f;
  border-width: 1px 0;
}

.markdown.api-container table th:first-child,
.markdown.api-container table td:first-child {
  border-left: 1px solid rgba(0, 0, 0, 0.06);
}

.markdown.api-container table th:last-child,
.markdown.api-container table td:last-child {
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

.markdown.api-container table th {
  padding-top: 14px;
  border-width: 1px 0 2px;
}

.markdown.api-container table tbody tr {
  transition: all 0.3s;
}

.markdown.api-container table tbody tr:hover {
  background: rgba(60, 90, 100, 0.04);
}

.markdown.api-container table td:first-child {
  width: 18%;
  color: #595959;
  font-weight: 600;
  white-space: nowrap;
}

.markdown.api-container table td:nth-child(2) {
  width: 55%;
}

.markdown.api-container table td:nth-child(3) {
  width: 22%;
  color: #c41d7f;
  font-size: 13px;
}

.markdown.api-container table td:nth-child(4) {
  width: 15%;
  font-size: 13px;
}

.markdown.api-container table td:nth-child(5) {
  width: 8%;
  font-size: 13px;
}

.markdown.api-container table td:nth-last-child(3):first-child {
  width: 38%;
}

.markdown.api-container table td:nth-last-child(3):first-child ~ td:nth-last-child(2) {
  width: 70%;
}

.markdown.api-container hr {
  margin: 12px 0;
}

.code-box {
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  transition: all 0.2s;
}

.code-box .code-box-title,
.code-box .code-box-title a {
  color: #000000d9;
  background: #fff;
}

.code-box,
.code-box .code-box-demo {
  background-color: #fff;
}

.code-box .markdown pre {
  margin: 0.5em 0;
  padding: 6px 12px;
}

.code-box .markdown pre code {
  margin: 0;
  background: #f5f5f5;
}

.code-box:target {
  border: 1px solid var(--ant-primary-color);
}

.code-box-expand-trigger {
  position: relative;
  margin-left: 12px;
  color: #3b4357;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.75;
  transition: all 0.3s;
}

.code-box-expand-trigger:hover {
  opacity: 1;
}

.ant-row-rtl .code-box-expand-trigger {
  margin-right: 8px;
  margin-left: 0;
}

.code-box-title {
  position: absolute;
  top: -14px;
  margin-left: 16px;
  padding: 1px 8px;
  color: #777;
  background: #fff;
  border-radius: 2px 2px 0 0;
  transition: background-color 0.4s;
}

.ant-row-rtl .code-box-title {
  margin-right: 16px;
  margin-left: 0;
  border-radius: 2px 0 0 2px;
}

.code-box-title a,
.code-box-title a:hover {
  color: #000000d9;
  font-weight: 500;
  font-size: 14px;
}

.code-box-description {
  padding: 18px 24px 12px;
}

.code-box a.edit-button {
  position: absolute;
  top: 5px;
  right: -16px;
  padding-right: 6px;
  font-size: 12px;
  text-decoration: none;
  background: inherit;
  transform: scale(0.9);
}

.code-box a.edit-button .anticon {
  color: #00000073;
  transition: all 0.3s;
}

.code-box a.edit-button .anticon:hover {
  color: #000000d9;
}

.ant-row.ant-row-rtl .code-box a.edit-button {
  right: auto;
  left: -22px;
  margin-right: 0;
  padding-right: 8px;
  padding-left: 6px;
}

.code-box-demo {
  padding: 42px 24px 50px;
  color: #000000d9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.code-box iframe {
  width: 100%;
  border: 0;
}

.code-box-meta.markdown {
  position: relative;
  width: 100%;
  font-size: 14px;
  border-radius: 0 0 2px 2px;
  transition: background-color 0.4s;
}

.code-box-meta blockquote {
  line-height: 1.5;
}

.code-box-meta h4,
section.code-box-meta p {
  margin: 0;
}

.code-box-meta > p {
  width: 100%;
  margin: 0.5em 0;
  padding-right: 25px;
  font-size: 12px;
  word-break: break-word;
}

.ant-row-rtl .code-box-meta > p {
  padding-right: 0;
  padding-left: 25px;
}

.code-box.expand .code-box-meta {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.06);
  border-radius: 0;
}

.code-box .code-expand-icon {
  cursor: pointer;
}

.code-box .code-expand-icon-show,
.code-box .code-expand-icon-hide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-shadow: none;
  transition: all 0.4s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ant-row-rtl .code-box .code-expand-icon-show,
.ant-row-rtl .code-box .code-expand-icon-hide {
  right: 0;
  left: auto;
}

.code-box .code-expand-icon-show {
  opacity: 0.55;
  pointer-events: auto;
}

.code-box .code-expand-icon-show:hover,
.code-box .code-expand-icon.ant-tooltip-open .code-expand-icon-show {
  opacity: 1;
}

.code-box .code-expand-icon-hide {
  opacity: 0;
  pointer-events: none;
}

.code-box .highlight-wrapper {
  display: none;
  overflow: auto;
  border-radius: 0 0 2px 2px;
}

.code-box .highlight-wrapper-expand {
  display: block;
}

.code-box .highlight {
  position: relative;
}

.code-box .highlight .ant-tabs-nav-list {
  margin: 0 auto;
}

.code-box .highlight pre {
  margin: 0;
  padding: 0;
  background: #fff;
}

.code-box .highlight:not(:first-child) {
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
}

.code-box-actions {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
  opacity: 0.7;
  transition: opacity 0.3s;
}

.code-box-actions:hover {
  opacity: 1;
}

.code-box-actions > .code-box-code-action {
  position: relative;
  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-left: 16px;
  color: #00000073;
  cursor: pointer;
  transition: all 0.24s;
}

.ant-row-rtl .code-box-actions > .code-box-code-action {
  margin-right: 16px;
  margin-left: 0;
}

.code-box-actions > .code-box-code-action:first-child {
  margin-left: 0;
}

.ant-row-rtl .code-box-actions > .code-box-code-action:first-child {
  margin-right: 0;
}

.code-box-actions > .code-box-code-action:hover {
  color: #000000d9;
}

.code-box-code-copy {
  width: 14px;
  height: 14px;
  font-size: 14px;
  text-align: center;
  background: #fff;
  cursor: pointer;
  transition: transform 0.24s;
}

.code-box-code-copy:hover {
  transform: scale(1.2);
}

.code-box-code-copy.anticon-check {
  color: #52c41a !important;
  font-weight: 700;
}

.code-box-codepen,
.code-box-riddle {
  width: 14px;
  height: 14px;
  overflow: hidden;
  border: 0;
  cursor: pointer;
}

.code-box-codesandbox {
  width: 16px;
  height: 16px;
  overflow: hidden;
  border: 0;
  cursor: pointer;
}

.code-box-codesandbox:hover,
.highlight-wrapper:hover .code-box-code-copy,
.highlight-wrapper:hover .code-box-codepen,
.highlight-wrapper:hover .code-box-codesandbox,
.highlight-wrapper:hover .code-box-riddle {
  opacity: 1;
}

.code-box pre {
  width: auto;
  margin: 0;
}

.code-box pre code {
  background: #fff;
  border: none;
}

.code-box-debug {
  border-color: #d3adf7;
}

.code-box-debug .code-box-title a {
  color: #722ed1;
}
</style>

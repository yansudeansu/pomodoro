import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-D4lIrffr.js";import{P as l}from"./PomodoroTimer-CUOCaJVV.js";import{T as g}from"./TaskManager-Df6lXNas.js";import{H as _}from"./Header-BaPmNKtw.js";import{u as n,P}from"./PomodoroContext-BAX-qwHT.js";import"./ModeSwitcher-B-sdEYCP.js";import"./Button-Cl0j0Tbl.js";import"./TimerControls-D2rboRqj.js";import"./TimerDisplay-X4n2myQT.js";import"./Text-D4pPwyNi.js";import"./InfoTooltip-CSQAauK_.js";import"./Icons-BD9QZvNq.js";import"./TaskInput-BMVgNDHq.js";import"./Input-DIfo0Vc4.js";import"./TaskList-Blyw-X_m.js";import"./Checkbox-CCBogLAs.js";import"./IconButton-093Uws8w.js";import"./Link-B1e0G779.js";const h="_page_1y6hw_1",f="_pomodoro_1y6hw_13",u="_short_break_1y6hw_17",x="_long_break_1y6hw_21",t={page:h,pomodoro:f,short_break:u,long_break:x},d=()=>{const{mode:e}=n();return o.jsxs(o.Fragment,{children:[o.jsx(_,{}),o.jsxs("main",{className:`${t.page} ${t[e]}`,children:[o.jsx(l,{}),o.jsx(g,{})]})]})};d.__docgenInfo={description:"",methods:[],displayName:"PomodoroPage"};const k=({children:e})=>o.jsx(P,{children:o.jsx(j,{children:e})}),j=({children:e})=>{const{setTasks:i,setMode:p}=n();return c.useEffect(()=>{i([{id:"1",title:"Design UI for Timer",completed:!1,pomodoros:2,completedPomodoros:1},{id:"2",title:"Review task manager UI",completed:!1,pomodoros:1,completedPomodoros:0}]),p("pomodoro")},[]),o.jsx(o.Fragment,{children:e})},q={title:"Pages/PomodoroPage",component:d,decorators:[e=>o.jsx(k,{children:o.jsx(e,{})})],parameters:{docs:{description:{component:"`PomodoroPage` is the main page that brings together the Pomodoro timer and task management. It displays the timer and allows users to manage tasks and Pomodoros."}}}},r={args:{}};var s,a,m;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {}
}`,...(m=(a=r.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const z=["Default"];export{r as Default,z as __namedExportsOrder,q as default};

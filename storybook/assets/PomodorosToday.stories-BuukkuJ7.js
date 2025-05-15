import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{P as n}from"./PomodorosToday-CMuSTo8o.js";import{P as i}from"./PomodoroContext-BZZk-DrD.js";import"./compiler-runtime-CJbQ6yvW.js";import"./index-c0qeY2gs.js";import"./Text-C1JEmKLm.js";import"./index-BE4Fbmwm.js";const b={title:"Molecules/PomodorosToday",component:n,tags:["autodocs"],argTypes:{count:{control:{type:"number",min:0},defaultValue:3,description:"Number of Pomodoros completed today"}},parameters:{docs:{description:{component:"`PomodorosToday` displays the number of Pomodoro sessions completed today. It only renders when at least one has been completed."}}}},o={render:a=>{const m=new Date().toISOString(),d=Array.from({length:a.count},(l,c)=>({id:`${c+1}`,completedAt:m}));return localStorage.setItem("global-pomodoros",JSON.stringify(d)),localStorage.setItem("pomodoro-tasks",JSON.stringify([])),r.jsx(i,{children:r.jsx(n,{})})},args:{count:5}};var t,e,s;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => {
    const now = new Date().toISOString();
    const mockPomodoros: GlobalPomodoro[] = Array.from({
      length: args.count
    }, (_, i) => ({
      id: \`\${i + 1}\`,
      completedAt: now
    }));
    localStorage.setItem('global-pomodoros', JSON.stringify(mockPomodoros));
    localStorage.setItem('pomodoro-tasks', JSON.stringify([]));
    return <PomodoroProvider>
        <PomodorosToday />
      </PomodoroProvider>;
  },
  args: {
    count: 5
  }
}`,...(s=(e=o.parameters)==null?void 0:e.docs)==null?void 0:s.source}}};const I=["Default"];export{o as Default,I as __namedExportsOrder,b as default};

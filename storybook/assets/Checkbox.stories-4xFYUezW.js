import{j}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./index-D4lIrffr.js";import{C as B}from"./Checkbox-CCBogLAs.js";const D={title:"Atoms/Checkbox",component:B,tags:["autodocs"],parameters:{docs:{description:{component:"The `Checkbox` component allows users to mark a task as complete. It visually adapts to the current mode (Pomodoro, Short Break, Long Break)."}}},argTypes:{checked:{control:"boolean",description:"Whether the checkbox is checked"},mode:{control:"radio",options:["pomodoro","short_break","long_break"],description:"The current timer mode, used for styling"},onChange:{action:"toggled"}}},o={render:e=>{const[t,P]=y.useState(e.checked??!1);return j.jsx(B,{...e,checked:t,onChange:()=>{var n;P(!t),(n=e.onChange)==null||n.call(e)}})},args:{checked:!1,mode:"pomodoro"}},r={args:{checked:!0,mode:"pomodoro"}},c={args:{checked:!1,mode:"pomodoro"}},s={args:{checked:!0,mode:"short_break"}},a={args:{checked:!0,mode:"long_break"}};var d,m,h;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={() => {
      setChecked(!checked);
      args.onChange?.();
    }} />;
  },
  args: {
    checked: false,
    mode: 'pomodoro'
  }
}`,...(h=(m=o.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var k,p,u;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    checked: true,
    mode: 'pomodoro'
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var l,i,g;c.parameters={...c.parameters,docs:{...(l=c.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    checked: false,
    mode: 'pomodoro'
  }
}`,...(g=(i=c.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var C,f,b;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    checked: true,
    mode: 'short_break'
  }
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var x,S,_;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    checked: true,
    mode: 'long_break'
  }
}`,...(_=(S=a.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};const U=["Default","PomodoroChecked","PomodoroUnchecked","ShortBreakChecked","LongBreakChecked"];export{o as Default,a as LongBreakChecked,r as PomodoroChecked,c as PomodoroUnchecked,s as ShortBreakChecked,U as __namedExportsOrder,D as default};

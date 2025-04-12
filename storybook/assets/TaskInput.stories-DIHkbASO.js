import{j as p}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{T as s}from"./TaskInput-BMVgNDHq.js";import"./Input-DIfo0Vc4.js";const k={title:"Molecules/TaskInput",component:s,tags:["autodocs"],parameters:{docs:{description:{component:"`TaskInput` is a styled wrapper around the base `Input` atom, used for adding new tasks. It adapts styling based on the current mode (Pomodoro, Short Break, Long Break)."}}},argTypes:{placeholder:{control:"text",description:"Placeholder text when input is empty"},mode:{control:"radio",options:["pomodoro","short_break","long_break"],description:"Current mode for styling"}}},e={args:{placeholder:"Add a new task...",mode:"pomodoro"},render:n=>{const[d,l]=u.useState("");return p.jsx(s,{...n,value:d,onChange:o=>l(o.target.value),onKeyDown:o=>console.log("Key down:",o.key)})}};var t,r,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    placeholder: 'Add a new task...',
    mode: 'pomodoro'
  },
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    return <TaskInput {...args} value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => console.log('Key down:', e.key)} />;
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const h=["Default"];export{e as Default,h as __namedExportsOrder,k as default};

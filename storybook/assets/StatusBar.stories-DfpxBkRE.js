import{S as n}from"./StatusBar-B0QcbmpW.js";import"./jsx-runtime-D_zvdyIk.js";import"./compiler-runtime-CJbQ6yvW.js";import"./index-c0qeY2gs.js";import"./StatusBarItem-a5k1OS0G.js";const g={title:"Molecules/StatusBar",component:n,parameters:{docs:{description:{component:"`StatusBar` displays the past 12 5-minute service checks as vertical colored bars."}}}},u=Date.now(),i=5*60*1e3,c=s=>s.map((p,a)=>({status:p,timestamp:new Date(u-a*i).toISOString()})).reverse(),e={args:{history:c(["up","down","up","up","down","up","up","down","up","up","up","up"])}};var t,o,r;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    history: generateHistory(['up', 'down', 'up', 'up', 'down', 'up', 'up', 'down', 'up', 'up', 'up', 'up'])
  }
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const y=["Mixed"];export{e as Mixed,y as __namedExportsOrder,g as default};

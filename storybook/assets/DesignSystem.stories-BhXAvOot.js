import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c}from"./compiler-runtime-CJbQ6yvW.js";import{T as t}from"./Text-C1JEmKLm.js";import"./index-c0qeY2gs.js";const f={title:"UI/Design System",parameters:{layout:"fullscreen"}},n=()=>{const o=c.c(1);let r;return o[0]===Symbol.for("react.memo_cache_sentinel")?(r=e.jsxs("div",{style:{padding:"2rem",background:"var(--background-color)",color:"var(--text-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"},children:[e.jsx("img",{src:"/favicon.ico",alt:"Pomodoro Icon",width:40,height:40}),e.jsx(t,{variant:"heading",children:"Pomodoro Design System"})]}),e.jsx(t,{variant:"body",children:"This page showcases the core design tokens used across the Pomodoro app. It includes color swatches, typography scale and foundational UI values."}),e.jsxs("section",{style:{marginTop:"2rem"},children:[e.jsx(t,{variant:"label",children:"🎨 Colors"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"1rem",marginTop:"1rem"},children:["--color-primary","--color-success","--color-info","--color-warning","--color-danger","--color-muted","--color-text","--color-heading","--background-color"].map(m)})]}),e.jsxs("section",{style:{marginTop:"2rem"},children:[e.jsx(t,{variant:"label",children:"🔠 Typography"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",marginTop:"1rem"},children:[{name:"XS",token:"--font-size-xs"},{name:"SM",token:"--font-size-sm"},{name:"Base",token:"--font-size-base"},{name:"MD",token:"--font-size-md"},{name:"LG",token:"--font-size-lg"},{name:"XL",token:"--font-size-xl"},{name:"2XL",token:"--font-size-2xl"}].map(d)})]})]}),o[0]=r):r=o[0],r};n.__docgenInfo={description:"",methods:[],displayName:"Overview"};function m(o){return e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"3rem",height:"3rem",borderRadius:"0.5rem",backgroundColor:`var(${o})`,border:"1px solid var(--color-border)"}}),e.jsx(t,{variant:"body",children:o})]},o)}function d(o){const{name:r,token:a}=o;return e.jsxs("span",{style:{fontSize:`var(${a})`,fontFamily:"var(--font-family-base)",fontWeight:"var(--font-weight-medium)",color:"var(--color-text)"},children:[r," - ",a]},a)}var s,i,l;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`() => <div style={{
  padding: '2rem',
  background: 'var(--background-color)',
  color: 'var(--text-color)'
}}>
    <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  }}>
      <img src="/favicon.ico" alt="Pomodoro Icon" width={40} height={40} />
      <Text variant="heading">Pomodoro Design System</Text>
    </div>

    <Text variant="body">
      This page showcases the core design tokens used across the Pomodoro app. It includes color
      swatches, typography scale and foundational UI values.
    </Text>

    <section style={{
    marginTop: '2rem'
  }}>
      <Text variant="label">🎨 Colors</Text>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '1rem'
    }}>
        {['--color-primary', '--color-success', '--color-info', '--color-warning', '--color-danger', '--color-muted', '--color-text', '--color-heading', '--background-color'].map(token => <div key={token} style={{
        textAlign: 'center'
      }}>
            <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '0.5rem',
          backgroundColor: \`var(\${token})\`,
          border: '1px solid var(--color-border)'
        }} />
            <Text variant="body">{token}</Text>
          </div>)}
      </div>
    </section>

    <section style={{
    marginTop: '2rem'
  }}>
      <Text variant="label">🔠 Typography</Text>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '1rem'
    }}>
        {[{
        name: 'XS',
        token: '--font-size-xs'
      }, {
        name: 'SM',
        token: '--font-size-sm'
      }, {
        name: 'Base',
        token: '--font-size-base'
      }, {
        name: 'MD',
        token: '--font-size-md'
      }, {
        name: 'LG',
        token: '--font-size-lg'
      }, {
        name: 'XL',
        token: '--font-size-xl'
      }, {
        name: '2XL',
        token: '--font-size-2xl'
      }].map(({
        name,
        token
      }) => <span key={token} style={{
        fontSize: \`var(\${token})\`,
        fontFamily: 'var(--font-family-base)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-text)'
      }}>
            {name} - {token}
          </span>)}
      </div>
    </section>
  </div>`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const y=["Overview"];export{n as Overview,y as __namedExportsOrder,f as default};

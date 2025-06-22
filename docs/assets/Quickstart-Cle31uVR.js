import{j as n}from"./iframe-BgshiAOW.js";import{useMDXComponents as i}from"./index-DaNmXBh5.js";function t(o){const e={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsxs("div",{children:[n.jsx(e.h1,{id:"quickstart",children:"Quickstart"}),n.jsx(e.h2,{id:"prerequisites",children:"Prerequisites"}),n.jsxs(e.p,{children:["The library defaults to using OpenAI for LLM calls. Information on how to add other LLM provider (e.g. Anthropic) ",n.jsx(e.a,{href:"#llm",children:"here"}),". Or open an issue in Github."]}),n.jsxs(e.p,{children:["You need to add ",n.jsx(e.code,{children:"OPENAI_API_KEY"})," as an environment variable pointing to your ",n.jsx(e.a,{href:"https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key",rel:"nofollow",children:"OpenAI API Key"}),"."]}),n.jsx(e.h2,{id:"out-of-the-box---3-components-needed",children:"Out of the Box - 3 Components Needed"}),n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"SmartToolTip"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"SmartToolTipProvider"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"SmartToolTipHelp"})}),`
`]}),n.jsxs(e.p,{children:["Wrap your app in the ",n.jsx(e.code,{children:"SmartToolTipProvider"}),":"]}),n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTipProvider>
  <App />
</SmartToolTipProvider>
`})})]}),`
`,n.jsxs(e.p,{children:["And inside your app, wrap your components with the ",n.jsx(e.code,{children:"SmartToolTip"})," component:"]}),`
`,n.jsxs(e.p,{children:["Add a ",n.jsx(e.code,{children:"description"})," prop to the ",n.jsx(e.code,{children:"SmartToolTip"})," component. This is internal-facing and will be sent to the LLM as context for the user's questions."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTip description={"Click this button to open up a greeting."}>
  <Button onClick={() => alert("Hello")}>Click Me</Button>
</SmartToolTip>
`})}),`
`,n.jsxs(e.p,{children:["Adding the ",n.jsx(e.code,{children:"SmartToolTip"})," component will automatically add a chat tooltip to the component enabled on hover."]}),`
`,n.jsx("div",{className:"bg-neutral-800 p-1",children:n.jsx("img",{src:"/stories/tool-tip.gif",width:"500",className:"m-auto border-1 border-neutral-400"})}),`
`,n.jsxs(e.p,{children:["And if you'd like to enable to the user to ask about any of the annotated items on the screen, you can add ",n.jsx(e.code,{children:"SmartToolTipHelp"})," anywhere on the screen. This is a help button."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`
...

<AppContainer>
  <SmartToolTip description={"Click this button to open up a greeting."}>
    <Button onClick={() => alert("Hello")}>Click Me</Button>
  </SmartToolTip>

  <SmartToolTip description={"Click this button to open up a farewell."}>
    <Button onClick={() => alert("Goodbye")}>Click Me</Button>
  </SmartToolTip>

  <SmartToolTipHelp />
</AppContainer>;
`})}),`
`,n.jsx("div",{className:"bg-neutral-800 p-1",children:n.jsx("img",{src:"/stories/page-help.gif",width:"500",className:"m-auto border-1 border-neutral-400"})}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h1,{id:"customization",children:"Customization"}),`
`,n.jsx(e.h2,{id:"custom-tip-components",children:"Custom Tip Components"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Doesn't have to be tooltip."})}),`
`,n.jsx(e.p,{children:"These are the default components that are used to render the tooltip."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Active"}),`
`,n.jsx(e.li,{children:"Inactive"}),`
`,n.jsx(e.li,{children:"Highlight"}),`
`]}),`
`,n.jsxs("div",{className:"flex flex-row items-center justify-around gap-3",children:[n.jsx("span",{className:"bg-neutral-800 p-1",children:n.jsx("img",{src:"/stories/ActiveToolTip.png",width:"200"})}),n.jsx("span",{className:"bg-neutral-800 p-1",children:n.jsx("img",{src:"/stories/InactiveToolTip.png",width:"200"})}),n.jsx("span",{className:"bg-neutral-800 p-1",children:n.jsx("img",{src:"/stories/HighlightToolTip.png",width:"300",className:"bg-white pt-1 pr-1 pb-1"})})]}),`
`,n.jsx(e.h3,{id:"override-the-tooltip-component",children:"Override the ToolTip Component"}),`
`,n.jsx(e.p,{children:"e.g..."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Maybe you'd prefer to use a modal instead of a tooltip for the chat window. Overwrite ",n.jsx(e.code,{children:"Active"})]}),`
`,n.jsxs(e.li,{children:["Maybe you'd prefer to add a border around the button to highlight it rather than pointing to it with a tooltip. Overwrite ",n.jsx(e.code,{children:"Highlight"}),"."]}),`
`]}),`
`,n.jsx(e.p,{children:"You can override any or all of these components by passing in your own components as long as they match the props of the default components."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`
const CustomActive = (props: SmartToolTipActiveProps) =>{
   ...
}

const CustomInactive = (props: SmartToolTipInactiveProps) => {
    ...
}

const CustomHighlight = (props: SmartToolTipHighlightProps) => {
    ...
}

<SmartToolTip description={"Click this button to open up a greeting."} Active={CustomActive} Inactive={CustomInactive} Highlighted={CustomHighlight}>
  <Button onClick={() => alert("Hello")}>Click Me</Button>
</SmartToolTip>;
`})}),`
`,n.jsx(e.h3,{id:"overwriting-the-tooltip-content",children:"Overwriting the ToolTip Content"}),`
`,n.jsx(e.p,{children:"Maybe you like the current tooltip/popover components, but want to implement your own content for the tooltip."}),`
`,n.jsx(e.p,{children:"e.g."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Maybe you'd like to style the Chat Window differently"}),`
`,n.jsx(e.li,{children:"Maybe you'd like to display the activating hotkey differently"}),`
`,n.jsx(e.li,{children:"Maybe you want the highlight components with a tooltip shaped like an arrow."}),`
`]}),`
`,n.jsx(e.h4,{id:"overwriting-the-active-tooltip-content",children:"Overwriting the Active ToolTip Content"}),`
`,n.jsx(e.p,{children:"The default of this is the Chat Window."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`const CustomActiveContent = (props: ActiveToolTipContentProps) => {
    ...
}
const CustomActiveToolTip = (props: ActiveToolTipProps)=>{
    return <ActiveToolTip {...props} TipContent={<CustomActiveContent>}/>
}

...

<SmartToolTip description={"Click this button to open up a greeting."} Active={CustomActiveToolTip}>
  <Button onClick={() => alert("Hello")}>Click Me</Button>
</SmartToolTip>;
`})}),`
`,n.jsx(e.h4,{id:"overwriting-the-active-tooltip-content-1",children:"Overwriting the Active ToolTip Content"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`const CustomInactiveContent = (props: InactiveToolTipContentProps) => {
    ...
}
const CustomInactiveToolTip = (props: InactiveToolTipProps)=>{
    return <InactiveToolTip {...props} TipContent={<CustomInactiveContent>}/>
}

\`\`\`tsx dark
<SmartToolTip description={"Click this button to open up a greeting."} Inactive={CustomInactiveToolTip}>
  <Button onClick={() => alert("Hello")}>Click Me</Button>
</SmartToolTip>;
`})}),`
`,n.jsx(e.h4,{id:"overwriting-the-highlight-tooltip-content",children:"Overwriting the Highlight ToolTip Content"}),`
`,n.jsx(e.p,{children:"The default of this is the Chat Window."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`
const CustomHighlightContent = (props: HighlightToolTipContentProps) => {
    ...
}
const CustomHighlightToolTip = (props: HighlightToolTipProps)=>{
    return <HighlightToolTip {...props} TipContent={<CustomHighlightContent>}/>
}

\`\`\`tsx dark

<SmartToolTip description={"Click this button to open up a greeting."} Highlight={CustomHighlightToolTip}>
  <Button onClick={() => alert("Hello")}>Click Me</Button>
</SmartToolTip>;
`})}),`
`,n.jsx(e.h2,{id:"custom-llm-model",children:"Custom LLM Model"}),`
`,n.jsx("span",{id:"llm"}),`
`,n.jsxs(e.p,{children:["The current default LLM used is OpenAI ",n.jsx(e.code,{children:"gpt-4o-mini"}),"."]}),`
`,n.jsx(e.p,{children:"To override this, you can change the model here"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTipProvider model="gpt-10">
  <App />
</SmartToolTipProvider>
`})}),`
`,n.jsxs(e.p,{children:["or change the LLM to a different provider that implements type ",n.jsx(e.code,{children:"AskLLM"})]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`const askAnthropic: AskLLM = (params) => {
    ....
}
`})}),`
`,n.jsx(e.p,{children:"Add it globally:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTipProvider askLLM={askAnthropic}>
  <App />
</SmartToolTipProvider>
`})}),`
`,n.jsx(e.p,{children:"Or change it locally"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTip askLLM={askAnthropic}>
  <Button {...props} />
</SmartToolTip>
`})}),`
`,n.jsx(e.h2,{id:"custom-prompts",children:"Custom Prompts"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Prompts need adjusting for your app?"}),`
`,n.jsxs(e.li,{children:["Need to adjust the prompts for your ",n.jsx(e.a,{href:"#llm",children:"custom model"}),"?"]}),`
`,n.jsxs(e.li,{children:["Prompts not working as well expected?",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Open up an issue on the Github page."}),`
`,n.jsx(e.li,{children:"Try your hand at prompt engineering 💪"}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(e.p,{children:["Overwrite any or all of the params defined in type ",n.jsx(e.code,{children:"ModelParams"})]}),`
`,n.jsxs(e.p,{children:["You can use the ",n.jsx(e.code,{children:"PROMPT_DEFAULTS"})," to access the defaults, if you'd like to extend them rather than override them."]}),`
`,n.jsx(e.p,{children:"Add it globally:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTipProvider
  system={"Custom system prompt"}
  history={[{ role: "user", content: "Answer in Spanish" }]}
  rejectUserMessage={"I can't answer that."}
>
  <App />
</SmartToolTipProvider>
`})}),`
`,n.jsx(e.p,{children:"Or change it locally"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTip
  system={"Custom system prompt"}
  history={[{ role: "user", content: "Answer in Spanish" }]}
  rejectUserMessage={"I can't answer that."}
>
  <Button {...props} />
</SmartToolTip>
`})}),`
`,n.jsx(e.h3,{id:"advanced---custom-tool-descriptions",children:"Advanced - Custom Tool Descriptions"}),`
`,n.jsx(e.p,{children:"You can overwrite the tool descriptions and names as well."}),`
`,n.jsx(e.h4,{id:"tools-used",children:"Tools Used"}),`
`,n.jsx(e.p,{children:"The library currently uses 2 tools:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ToolLLM.GetActive"}),":",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.em,{children:"Description"}),": Returns the active ",n.jsx(e.code,{children:"SmartToolTip"}),"."]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ToolLLM.ListAvailable"}),":",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.em,{children:"Description"}),": Returns all ",n.jsx(e.code,{children:"SmartToolTip"}),"s currently rendered on screen."]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(e.p,{children:["Both return info about the respective ",n.jsx(e.code,{children:"SmartToolTip"}),"s to provide context to the LLM model."]}),`
`,n.jsx(e.h4,{id:"overriding-tool-descriptions",children:"Overriding Tool Descriptions"}),`
`,n.jsx(e.p,{children:"Add it globally"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTipProvider
  toolDetails={{
    [ToolLLM.GetActive]: {
      description: "Custom description",
      name: "Custom name",
    },
    [ToolLLM.ListAvailable]: {
      description: "Custom description",
      name: "Custom name",
    },
  }}
>
  <App />
</SmartToolTipProvider>
`})}),`
`,n.jsx(e.p,{children:"Or change it locally"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTip
  toolDetails={{
    [ToolLLM.GetActive]: {
      description: "Custom description",
      name: "Custom name",
    },
    [ToolLLM.ListAvailable]: {
      description: "Custom description",
      name: "Custom name",
    },
  }}
>
  <Button {...props} />
</SmartToolTip>
`})}),`
`,n.jsxs(e.p,{children:["You can use the ",n.jsx(e.code,{children:"PROMPT_DEFAULTS"})," to access the defaults, if you'd like to extend them rather than override them."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<SmartToolTip
  toolDetails={{
    ...PROMPT_DEFAULTS.toolDetails,
    [ToolLLM.ListAvailable]: {
      description: "Custom description",
      name: "Custom name",
    },
  }}
>
  <Button {...props} />
</SmartToolTip>
`})})]})}function l(o={}){const{wrapper:e}={...i(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{l as default};

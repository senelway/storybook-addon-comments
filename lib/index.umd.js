!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("query-string"),require("styled-components"),require("@babel/runtime/helpers/defineProperty"),require("react"),require("firebase/app"),require("firebase/database"),require("@storybook/addons")):"function"==typeof define&&define.amd?define(["exports","query-string","styled-components","@babel/runtime/helpers/defineProperty","react","firebase/app","firebase/database","@storybook/addons"],t):t(e["storybook-addon-comments"]={},e.queryString,e.styled,e._defineProperty,e.React,e.firebase,null,e.addons)}(this,function(e,t,a,n,o,r,s,i){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t,a=a&&a.hasOwnProperty("default")?a.default:a,n=n&&n.hasOwnProperty("default")?n.default:n,r=r&&r.hasOwnProperty("default")?r.default:r,i=i&&i.hasOwnProperty("default")?i.default:i;const d="storybooks/storybook-addon-comments",l=`${d}/event`,u=/ /g,m=()=>t.parse(window.location.search),p=()=>((e,t)=>{const a=e=>e.replace(u,"_");return`${a(e)}/${a(t)}`})(m().selectedKind,m().selectedStory),c=a.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid rgba(0,0,0,0.1);

  &[disabled] {
    cursor: no-drop;
    background-color: #e5e5e5;
  }
`,h=a.div`
  display: block;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`,b=a.p`
  color: rgba(0,0,0,0.4);
`,g=a.button`
  border: 0;
  padding: 5px;
  min-width: 100px;
  display: block;
  box-shadow: none;
  background-color: #e5e5e5;
`,f=a.p`

`,y=a.div`
  padding: 20px;
  width: 100%;
`,x=a.p`
  margin: 5px 0;
`,v=a.form`
  margin-top: 30px;
`;class w extends o.PureComponent{constructor(){super(),n(this,"onEventHandler",e=>{const t=this.props.api;r.initializeApp(e),t.onStory(()=>this.getFirebaseData())}),n(this,"onToggleLoader",()=>this.setState(e=>({isLoading:!e.isLoading}))),n(this,"onChange",({currentTarget:e})=>{this.setState({[e.name]:e.value})}),n(this,"onSubmit",e=>{e.preventDefault();const t=this.state,a=t.name,n=t.message;this.onToggleLoader(),localStorage.setItem("name",a),r.database().ref(p()).push({name:a,message:n,createdAt:(new Date).toLocaleString()}),this.setState({message:""},this.getFirebaseData)}),n(this,"onRemove",e=>r.database().ref(`${p()}/${e}`).remove()),n(this,"getFirebaseData",()=>{this.onToggleLoader(),r.database().ref(p()).once("value").then(e=>this.setState({isLoading:!1,data:e.val()}))}),this.state={isLoading:!1,name:localStorage.getItem("name")||"",message:"",data:null}}componentDidMount(){this.props.channel.on(l,this.onEventHandler)}render(){const e=this.state,t=e.name,a=e.message,n=e.isLoading,r=e.data;return o.createElement(y,null,n?o.createElement(x,null,"loading..."):r&&Object.keys(r).map(e=>o.createElement(h,{key:e},o.createElement(b,null,r[e].name," ",o.createElement("span",null,r[e].createdAt)),o.createElement(f,null,r[e].message),o.createElement("button",{type:"button",onClick:()=>this.onRemove(e)},"remove"))),o.createElement(v,{onSubmit:this.onSubmit},o.createElement(c,{required:!0,placeholder:"name",onChange:this.onChange,name:"name",type:"text",value:t,disabled:!!localStorage.getItem("name")}),o.createElement(c,{required:!0,placeholder:"message",onChange:this.onChange,name:"message",type:"text",value:a}),o.createElement(g,{onSubmit:this.onSubmit,type:"submit"},"submit")))}}(function(){i.register(d,e=>{const t=i.getChannel();i.addPanel(d,{title:"Comments",render:()=>o.createElement(w,{channel:t,api:e})})})})(),e.default=function(e){const t=i.getChannel();if(!t)throw new Error("Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.");t.emit(l,e)};var S=e.default;e.rewire=function(t){e.default=t},e.restore=function(){e.default=S},Object.defineProperty(e,"__esModule",{value:!0})});

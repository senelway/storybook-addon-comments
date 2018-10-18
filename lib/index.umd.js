!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("styled-components"),require("@babel/runtime/helpers/defineProperty"),require("react"),require("firebase/app"),require("firebase/database"),require("reflexer"),require("@storybook/addons")):"function"==typeof define&&define.amd?define(["exports","styled-components","@babel/runtime/helpers/defineProperty","react","firebase/app","firebase/database","reflexer","@storybook/addons"],t):t(e["storybook-addon-comments"]={},e.styled,e._defineProperty,e.React,e.firebase,null,e.reflexer,e.addons)}(this,function(e,t,a,n,o,r,s,i){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t,a=a&&a.hasOwnProperty("default")?a.default:a,o=o&&o.hasOwnProperty("default")?o.default:o,i=i&&i.hasOwnProperty("default")?i.default:i;const d="storybooks/storybook-addon-comments",l=`${d}/comments-event`,m=t.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid rgba(0,0,0,0.1);

  &[disabled] {
    cursor: no-drop;
    background-color: #e5e5e5;
  }
`,u=t.div`
  display: block;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`,c=t.p`
  color: rgba(0,0,0,0.4);
`,p=t.button`
  border: 0;
  padding: 5px;
  min-width: 100px;
  display: block;
  box-shadow: none;
  background-color: #e5e5e5;
`,b=t.p`

`;class h extends n.PureComponent{constructor(){super(),a(this,"onEventHandler",e=>{o.initializeApp(e),this.getData()}),a(this,"onToggleLoader",()=>this.setState(e=>({isLoading:!e.isLoading}))),a(this,"onChange",({currentTarget:e})=>{this.setState({[e.name]:e.value})}),a(this,"onSubmit",e=>{e.preventDefault();const t=this.state,a=t.name,n=t.message;this.props.api.onStory((e,t)=>{localStorage.setItem("name",a),o.database().ref(`${e}/${t}`).push({name:a,message:n,createdAt:(new Date).toLocaleString()}),this.getData()})}),a(this,"getData",()=>{this.onToggleLoader(),this.props.api.onStory((e,t)=>o.database().ref(`${e}/${t}`).once("value").then(e=>this.setState({isLoading:!1,data:e.val()||{}})))}),this.state={isLoading:!1,name:localStorage.getItem("name",""),message:"",data:{}}}componentDidMount(){this.props.channel.on(l,this.onEventHandler)}render(){const e=this.state,t=e.name,a=e.message,o=e.isLoading,r=e.data;return n.createElement(s.Grid,{fluid:!0},o&&n.createElement("div",null,"loading..."),n.createElement(s.Row,null,n.createElement(s.Col,{basis:{xs:12,md:8}},r&&Object.keys(r).map(e=>n.createElement(u,{key:e},n.createElement(c,null,r[e].name," ",n.createElement("span",null,r[e].createdAt)),n.createElement(b,null,r[e].message)))),n.createElement(s.Col,{as:"form",basis:{xs:12,md:4},onSubmit:this.onSubmit},n.createElement(m,{required:!0,onChange:this.onChange,name:"name",type:"text",value:t,disabled:!!localStorage.getItem("name")}),n.createElement(m,{required:!0,placeholder:"message",onChange:this.onChange,name:"message",type:"text",value:a}),n.createElement(p,{onSubmit:this.onSubmit,type:"submit"},"submit"))))}}(function(){i.register(d,e=>{const t=i.getChannel();i.addPanel(d,{title:"Comments",render:()=>n.createElement(h,{channel:t,api:e})})})})(),e.default=function(e){const t=i.getChannel();if(!t)throw new Error("Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.");t.emit(l,e)};var g=e.default;e.rewire=function(t){e.default=t},e.restore=function(){e.default=g},Object.defineProperty(e,"__esModule",{value:!0})});

import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';
const T='\x01"%\tIQqy\0\0\0\0\0\0\0\x001111111)111)111\x00111\0\0\0\0\0\0\0\0\0\0\0\0\0\x03\v\v\x03\x01\0\0\0\0\0\0\0\0\0\0\0)\x11\0\0\0\0\0\0\0\0\0\0\0\0\0\0\t\t!\t';
const F=[(x,y)=>x+y,(x,y)=>x-y,Math.imul,(x,y)=>x==-2147483648&&y==-1?x:x/y,(x,y)=>y==-1?0:x%y,(x,y)=>Math.floor((x>>>0)/(y>>>0)),(x,y)=>(x>>>0)%(y>>>0),0,(x,y)=>x&y,(x,y)=>x|y,(x,y)=>x^y,0,(x,y)=>x<<y,(x,y)=>x>>y,(x,y)=>x>>>y,0,(x,y)=>x==y?1:0,(x,y)=>x<y?1:0,(x,y)=>x>>>0<y>>>0?1:0];
function run(p,u){
let n=p.length,D=new Int32Array(256),s=0,C=new Int32Array(64),k=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,g=0,P=0,S=0;
let E=t=>[o.slice(0,l),t];
for(;;){
if(S==1e6)return E(10);
if(P<0||P>=n)return E(9);
let q=p[P],x=P+1;S++;
let z=T.charCodeAt(q)||0;
if(!z)return E(5);
let m=z-1,im=m&7,po=m>>3&3,pu=m>>5;
if(P+im>=n)return E(9);
if(s<po)return E(2);
if(s-po+pu>256)return E(3);
P=x+im;
if(q==0)return E(0);
if(q<8){
if(q==1)D[s++]=(p[x]<<24)>>24;
else if(q==2)D[s++]=p[x]|p[x+1]<<8|p[x+2]<<16|p[x+3]<<24;
else if(q==3)s--;
else if(q==4)D[s]=D[s-1],s++;
else if(q==5){let t=D[s-1];D[s-1]=D[s-2],D[s-2]=t;}
else if(q==6)D[s]=D[s-2],s++;
else{let t=D[s-3];D[s-3]=D[s-2],D[s-2]=D[s-1],D[s-1]=t;}
}else if(q<35){
if(q==23||q==27)D[s-1]=q==23?-D[s-1]:~D[s-1];
else{let v=D[s-1],w=D[s-2];if(!v&&q>18&&q<23)return E(4);s-=2,D[s++]=F[q-16](w,v);}
}else if(q<53){
let r=q<52?(p[P-2]|p[P-1]<<8)<<16>>16:0;
if(q==48)P+=r;
else if(q==49||q==50){let v=D[--s];if(q==49?v==0:v!=0)P+=r;}
else if(q==51){if(k==64)return E(7);C[k++]=P,P=p[P-2]|p[P-1]<<8;}
else{if(k==0)return E(8);P=C[--k];}
}else if(q<66){
if(q==64){let v=D[s-1];if(v<0||v>255)return E(6);D[s-1]=M[v];}
else{let v=D[s-1],w=D[s-2];if(v<0||v>255)return E(6);s-=2,M[v]=w;}
}else{
if(q==80){let t=String(D[s-1]);if(l+t.length>65536)return E(11);s--,o.set(Buffer.from(t),l),l+=t.length;}
else if(q==81){if(l>65535)return E(11);o[l++]=D[--s]&255;}
else if(q==82)D[s++]=g<u.length?u[g++]:-1;
else return E(D[--s]&255);
}
}
}
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(let h of b(I).sort()){let[r,t]=run(c(I+'/'+h+'/program.bin'),c(I+'/'+h+'/input.bin'));a(O+'/'+h,{recursive:!0});d(O+'/'+h+'/stdout.bin',r);d(O+'/'+h+'/exit.txt',t+'\n');}

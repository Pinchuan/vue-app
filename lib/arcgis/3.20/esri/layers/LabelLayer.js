// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/labelLayerUtils/DynamicLabelClass":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../geometry/Extent ../../geometry/Polygon".split(" "),function(C,H,B,I,D,E){C=C(null,{declaredClass:"esri.layers.labelLayerUtils.DynamicLabelClass",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._y1=this._x1=this._y0=this._x0=this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1},setMap:function(h,b){this._labelLayer=
b;this._xmin=h.extent.xmin;this._xmax=h.extent.xmax;this._ymin=h.extent.ymin;this._ymax=h.extent.ymax;this._scale=(this._xmax-this._xmin)/h.width},_process:function(h){this._preparedLabels=h;this._placedLabels=[];var b;for(h=this._preparedLabels.length-1;0<=h;h--){var a=this._preparedLabels[h],c=Math.min(a.labelWidth,a.labelHeight),k=a.labelWidth+0*c,c=a.labelHeight+0*c,d=(b=a.options)&&void 0!==b.lineLabelPlacement?b.lineLabelPlacement:"PlaceAtCenter",e=b&&void 0!==b.lineLabelPosition?b.lineLabelPosition:
"Above",f=b&&void 0!==b.pointPriorities?b.pointPriorities:"AboveRight",g=[2,2,1,3,0,2,3,3,2];"AboveLeft"==f?g=[1,2,2,2,0,3,2,3,3]:"AboveCenter"==f?g=[2,1,2,2,0,2,3,3,3]:"AboveRight"==f?g=[2,2,1,3,0,2,3,3,2]:"CenterLeft"==f?g=[2,2,3,1,0,3,2,2,3]:"CenterCenter"==f?g=[0,0,0,0,1,0,0,0,0]:"CenterRight"==f?g=[3,2,2,3,0,1,3,2,2]:"BelowLeft"==f?g=[2,3,3,2,0,3,1,2,2]:"BelowCenter"==f?g=[3,3,3,2,0,2,2,1,2]:"BelowRight"==f&&(g=[3,3,2,3,0,2,2,2,1]);var l=b&&void 0!==b.labelRotation?b.labelRotation:!0,f=Math.PI/
180*a.angle;b=b&&void 0!==b.howManyLabels?b.howManyLabels:"OneLabel";if("point"==a.geometry.type)this._generatePointPositions(a,a.geometry.x,a.geometry.y,a.text,f,k,c,a.symbolWidth,a.symbolHeight,g);else if("multipoint"==a.geometry.type)for(d=a.geometry,e=0;e<d.points.length;e++)this._generatePointPositions(a,d.points[e][0],d.points[e][1],a.text,f,k,c,a.symbolWidth,a.symbolHeight,g);else"polyline"==a.geometry.type?this._generateLinePositions(a,a.geometry,a.text,k,c,2*a.symbolHeight+c,d,e,l):"polygon"==
a.geometry.type&&this._generatePolygonPositions(a,b,a.geometry,a.text,f,k,c)}return this._placedLabels},_generatePointPositions:function(h,b,a,c,k,d,e,f,g,l){f=(f+d)*this._scale;g=(g+e)*this._scale;var p,n;for(p=1;3>=p;p++)for(n=1;9>=n;n++)if(l[n-1]==p)switch(n){case 1:if(this._findPlace(h,c,b-f,a+g,k,d,e))return;break;case 2:if(this._findPlace(h,c,b,a+g,k,d,e))return;break;case 3:if(this._findPlace(h,c,b+f,a+g,k,d,e))return;break;case 4:if(this._findPlace(h,c,b-f,a,k,d,e))return;break;case 5:if(this._findPlace(h,
c,b,a,k,d,e))return;break;case 6:if(this._findPlace(h,c,b+f,a,k,d,e))return;break;case 7:if(this._findPlace(h,c,b-f,a-g,k,d,e))return;break;case 8:if(this._findPlace(h,c,b,a-g,k,d,e))return;break;case 9:if(this._findPlace(h,c,b+f,a-g,k,d,e))return}},_generateLinePositions:function(h,b,a,c,k,d,e,f,g){var l=c*this._scale*c*this._scale,p,n,m;for(p=0;p<b.paths.length;p++){var x=b.paths[p],t=x.length,r=Math.floor((t-1)/2),w=0!==(t-1)%2?1:-1;"PlaceAtStart"==e&&(r=0,w=1);"PlaceAtEnd"==e&&(r=t-2,w=-1);for(;0<=
r&&r<t-1;){for(n=r;n<t;n++){var v=x[r][0],u=x[r][1],q=x[n][0]-v,y=x[n][1]-u;if(q*q+y*y>l){for(var z=Math.atan2(y,q);z>Math.PI/2;)z-=Math.PI;for(;z<-(Math.PI/2);)z+=Math.PI;var A=Math.sin(z),F=Math.cos(z),J=0,G=0;"Above"==f&&(J=d*A*this._scale,G=d*F*this._scale);"Below"==f&&(J=-d*A*this._scale,G=-d*F*this._scale);if(1==n-r){if(this._clipLine(v,u,x[n][0],x[n][1])&&(v=this._x1-this._x0,m=this._y1-this._y0,v*v+m*m>l&&(n=Math.atan2(m,v),q=c/2+2*k,u=q*this._scale*Math.cos(n),q=q*this._scale*Math.sin(n),
"PlaceAtStart"==e?(v=this._x0+u,m=this._y0+q):"PlaceAtEnd"==e?(v=this._x1-u,m=this._y1-q):(v=this._x0+v/2,m=this._y0+m/2),this._findPlace(h,a,v-J,m+G,g?-n:0,c,k))))return}else{var K=0;for(m=r;m<=n;m++)K=Math.max(K,Math.abs((x[m][1]-u)*F-(x[m][0]-v)*A));if(K<k&&this._findPlace(h,a,v+q/2-J,u+y/2+G,g?-z:0,c,k))return}break}}r+=w}}},_generatePolygonPositions:function(h,b,a,c,k,d,e){var f;if("ManyLabels"==b)for(b=0;b<a.rings.length;b++)f=a.rings[b],E.prototype.isClockwise(f)&&(f=this._findCentroid(f,this._xmin,
this._ymin,this._xmax,this._ymax),this._findPlace(h,c,f[0],f[1],k,d,e));else{f=this._findCentroidForFeature(a,this._xmin,this._ymin,this._xmax,this._ymax);var g=f[1],l=0;for(b=0;10>b;b++){l+=e/4;f=this._findCentroidForFeature(a,this._xmin,g+(l-e/4),this._xmax,g+(l+e/4));if(this._findPlace(h,c,f[0],f[1],k,d,e))break;f=this._findCentroidForFeature(a,this._xmin,g-(l+e/4),this._xmax,g-(l-e/4));if(this._findPlace(h,c,f[0],f[1],k,d,e))break}}},_findCentroid:function(h,b,a,c,k){var d=h.length,e=[0,0],f=
0,g=h[0][0],l=h[0][1];g>c&&(g=c);g<b&&(g=b);l>k&&(l=k);l<a&&(l=a);for(var p=1;p<d-1;p++){var n=h[p][0],m=h[p][1],x=h[p+1][0],t=h[p+1][1];n>c&&(n=c);n<b&&(n=b);m>k&&(m=k);m<a&&(m=a);x>c&&(x=c);x<b&&(x=b);t>k&&(t=k);t<a&&(t=a);var r=(n-g)*(t-l)-(x-g)*(m-l);e[0]+=r*(g+n+x);e[1]+=r*(l+m+t);f+=r}e[0]/=3*f;e[1]/=3*f;if(isNaN(e[0])||isNaN(e[1]))return e;a=[];this._fillBuffer(h,a,e);e[0]=this._sortBuffer(a,e[0],b,c);return e},_findCentroidForFeature:function(h,b,a,c,k){for(var d,e=0,f=[0,0],g=0;g<h.rings.length;g++){var l=
h.rings[g],p=l.length,n=l[0][0],m=l[0][1];n>c&&(n=c);n<b&&(n=b);m>k&&(m=k);m<a&&(m=a);for(d=1;d<p-1;d++){var x=l[d][0],t=l[d][1],r=l[d+1][0],w=l[d+1][1];x>c&&(x=c);x<b&&(x=b);t>k&&(t=k);t<a&&(t=a);r>c&&(r=c);r<b&&(r=b);w>k&&(w=k);w<a&&(w=a);var v=(x-n)*(w-m)-(r-n)*(t-m);f[0]+=v*(n+x+r);f[1]+=v*(m+t+w);e+=v}}f[0]/=3*e;f[1]/=3*e;if(isNaN(f[0])||isNaN(f[1]))return f;a=[];for(d=0;d<h.rings.length;d++)this._fillBuffer(h.rings[d],a,f);f[0]=this._sortBuffer(a,f[0],b,c);return f},_fillBuffer:function(h,b,
a){for(var c=h.length-1,k=h[0][1]>=h[c][1]?1:-1,d=0;d<=c;d++){var e=d,f=d+1;d==c&&(f=0);var g=h[e][0],e=h[e][1],l=h[f][0],f=h[f][1],p=f>=e?1:-1;if(e<=a[1]&&a[1]<=f||f<=a[1]&&a[1]<=e)a[1]!=e&&a[1]!=f?(b.push((a[1]-e)*(l-g)/(f-e)+g),k=p):a[1]==e&&a[1]!=f?(k!=p&&b.push(g),k=p):a[1]!=e&&a[1]==f?(b.push(l),k=p):a[1]==e&&a[1]==f&&(1==k&&b.push(g),b.push(l),k=p)}},_sortBuffer:function(h,b,a,c){var k=h.length;h.sort();if(0<k){for(var d=0,e=b=0;e<k-1;e+=2){var f=Math.abs(h[e+1]-h[e]);!(h[e]<=a&&h[e+1]<=a||
h[e]>=c&&h[e+1]>=c)&&f>d&&(d=f,b=e)}k=h[b];h=h[b+1];k>c&&(k=c);k<a&&(k=a);h>c&&(h=c);h<a&&(h=a);b=(k+h)/2}return b},_findPlace:function(h,b,a,c,k,d,e){if(isNaN(a)||isNaN(c))return!1;for(var f=0;f<this._placedLabels.length;f++){var g=this._placedLabels[f].angle,l=this._placedLabels[f].width*this._scale,p=this._placedLabels[f].height*this._scale,n=this._placedLabels[f].x-a,m=this._placedLabels[f].y-c;if(0===k&&0===g){if(this._findPlace2(-d*this._scale,-e*this._scale,d*this._scale,e*this._scale,n-l,
m-p,n+l,m+p))return!1}else{var x=new D(-d*this._scale,-e*this._scale,d*this._scale,e*this._scale,null),t=0,r=1;0!==k&&(t=Math.sin(k),r=Math.cos(k));var w=n*r-m*t,n=n*t+m*r,g=g-k,t=Math.sin(g),r=Math.cos(g),v=-l*r- -p*t,m=-l*t+-p*r,g=+l*r- -p*t,u=+l*t+-p*r,l=w+v,p=n-m,t=w+g,r=n-u,v=w-v,m=n+m,w=w-g,n=n+u,g=new E;g.addRing([[l,p],[t,r],[v,m],[w,n],[l,p]]);if(x.intersects(g))return!1}}for(;k>Math.PI/2;)k-=Math.PI;for(;k<-(Math.PI/2);)k+=Math.PI;f={};f.layer=h;f.text=b;f.angle=k;f.x=a;f.y=c;f.width=d;
f.height=e;this._placedLabels.push(f);return!0},_findPlace2:function(h,b,a,c,k,d,e,f){return(h>=k&&h<=e||a>=k&&a<=e||h<=k&&a>=e)&&(b>=d&&b<=f||c>=d&&c<=f||b<=d&&c>=f)?!0:!1},_clipLine:function(h,b,a,c){for(var k=this._code(h,b),d=this._code(a,c);0!==k||0!==d;){if(0!==(k&d))return!1;var e=a-h,f=c-b;0!==k?(h<this._xmin?(b+=f*(this._xmin-h)/e,h=this._xmin):h>this._xmax?(b+=f*(this._xmax-h)/e,h=this._xmax):b<this._ymin?(h+=e*(this._ymin-b)/f,b=this._ymin):b>this._ymax&&(h+=e*(this._ymax-b)/f,b=this._ymax),
k=this._code(h,b)):(a<this._xmin?(c+=f*(this._xmin-a)/e,a=this._xmin):a>this._xmax?(c+=f*(this._xmax-a)/e,a=this._xmax):c<this._ymin?(a+=e*(this._ymin-c)/f,c=this._ymin):c>this._ymax&&(a+=e*(this._ymax-c)/f,c=this._ymax),d=this._code(a,c))}this._x0=h;this._y0=b;this._x1=a;this._y1=c;return!0},_code:function(h,b){var a=0;h<this._xmin&&(a+=8);h>this._xmax&&(a+=4);b<this._ymin&&(a+=2);b>this._ymax&&(a+=1);return a}});B("extend-esri")&&H.setObject("layers.labelLayerUtils.DynamicLabelClass",C,I);return C})},
"esri/layers/labelLayerUtils/StaticLabelClass":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../geometry/Extent ../../geometry/Point ../../geometry/Polygon".split(" "),function(C,H,B,I,D,E,h){return C(null,{declaredClass:"esri.layers.labelLayerUtils.StaticLabel",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1;this._LINE_STEP_CONST=1.5;this._POLYGON_X_STEP_CONST=1;this._POLYGON_Y_STEP_CONST=
.75;this._OVERRUN=2},setMap:function(b,a){this._labelLayer=a;this._map=b;this._xmin=b.extent.xmin;this._xmax=b.extent.xmax;this._ymin=b.extent.ymin;this._ymax=b.extent.ymax;this._scale=(this._xmax-this._xmin)/b.width},_process:function(b){var a,c,k,d,e,f,g,l,p;this._preparedLabels=b;this._placedLabels=[];for(b=this._preparedLabels.length-1;0<=b;b--){a=this._preparedLabels[b];e=a.labelWidth;f=a.labelHeight;l=(g=a.options)&&g.lineLabelPlacement?g.lineLabelPlacement:"PlaceAtCenter";p=g&&g.lineLabelPosition?
g.lineLabelPosition:"Above";c=g&&g.labelRotation?g.labelRotation:!0;k=Math.PI/180*a.angle;d=g&&g.howManyLabels?g.howManyLabels:"OneLabel";var n=[];if("point"===a.geometry.type)this._generatePointPositions(a.geometry.x,a.geometry.y,a.text,k,e,f,a.symbolWidth,a.symbolHeight,g,n);else if("multipoint"===a.geometry.type)for(c=0;c<a.geometry.points.length;c++)this._generatePointPositions(a.geometry.points[c][0],a.geometry.points[c][1],a.text,k,e,f,a.symbolWidth,a.symbolHeight,g,n);else if("polyline"===
a.geometry.type)if("PlaceAtStart"===l)this._generateLinePositionsPlaceAtStart(a.geometry,!0,a.text,e,f,2*a.symbolHeight+f,l,p,c,n);else if("PlaceAtEnd"===l)this._generateLinePositionsPlaceAtEnd(a.geometry,!0,a.text,e,f,2*a.symbolHeight+f,l,p,c,n);else{g=[];var m=a.geometry.getExtent(),x=this._map.extent;if(m.getWidth()<e*this._scale/this._OVERRUN&&m.getHeight()<e*this._scale/this._OVERRUN)continue;else.5*m.getWidth()<x.getWidth()&&.5*m.getHeight()<x.getHeight()?this._generateLinePositionsPlaceAtCenter(a.geometry,
!1,.1*Math.min(this._map.width,this._map.height)*this._scale,a.text,e,f,2*a.symbolHeight+f,l,p,c,g):this._generateLinePositionsPlaceAtCenter(a.geometry,!0,.2*Math.min(this._map.width,this._map.height)*this._scale,a.text,e,f,2*a.symbolHeight+f,l,p,c,g);this._postSorting(x,g,n)}else if("polygon"===a.geometry.type){l=[];for(c=0;c<a.geometry.rings.length;c++)p=a.geometry.rings[c],1<a.geometry.rings.length&&!h.prototype.isClockwise(p)||(g=this._calcRingExtent(p),g.xmax-g.xmin<4*e*this._scale/this._OVERRUN&&
g.ymax-g.ymin<4*f*this._scale/this._OVERRUN||l.push(p));l.sort(function(a,b){return b.length-a.length});for(c=0;c<l.length;c++)this._generatePolygonPositionsForManyLabels(l[c],a.geometry.spatialReference,a.text,k,e,f,n)}for(c=0;c<n.length&&(l=n[c].x,p=n[c].y,void 0!==n[c].angle&&(k=n[c].angle),g=this._findPlace(a,a.text,l,p,k,e,f),"OneLabel"!==d||!g||!this._labelLayer._isWithinScreenArea(new E(l,p,a.geometry.spatialReference)));c++);}return this._placedLabels},_generatePointPositions:function(b,a,
c,k,d,e,f,g,l,p){c=l&&l.pointPriorities?l.pointPriorities:"AboveRight";d=(f+d)*this._scale;e=(g+e)*this._scale;switch(c.toLowerCase()){case "aboveleft":b-=d;a+=e;break;case "abovecenter":a+=e;break;case "aboveright":b+=d;a+=e;break;case "centerleft":b-=d;break;case "centercenter":break;case "centerright":b+=d;break;case "belowleft":b-=d;a-=e;break;case "belowcenter":a-=e;break;case "belowright":b+=d;a-=e;break;default:return}p.push({x:b,y:a})},_generateLinePositionsPlaceAtStart:function(b,a,c,k,d,
e,f,g,l,p){f=k*this._scale;var n=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale,m,h,t,r,w,v,u,q;for(m=0;m<b.paths.length;m++){var y=b.paths[m],z=f,A=0;for(h=0;h<y.length-1;h++)t=y[h][0],r=y[h][1],w=y[h+1][0],v=y[h+1][1],u=w-t,q=v-r,u=Math.sqrt(u*u+q*q),A+u>z?(A=this._generatePositionsOnLine(b.spatialReference,a,z,n,A,t,r,w,v,c,k,d,e,g,l,p),z=n):A+=u}},_generateLinePositionsPlaceAtEnd:function(b,a,c,k,d,e,f,g,l,h){f=k*this._scale;var n=this._LINE_STEP_CONST*Math.min(this._map.width,
this._map.height)*this._scale,m,p,t,r,w,v,u,q;for(m=0;m<b.paths.length;m++){var y=b.paths[m],z=f,A=0;for(p=y.length-2;0<=p;p--)t=y[p+1][0],r=y[p+1][1],w=y[p][0],v=y[p][1],u=w-t,q=v-r,u=Math.sqrt(u*u+q*q),A+u>z?(A=this._generatePositionsOnLine(b.spatialReference,a,z,n,A,t,r,w,v,c,k,d,e,g,l,h),z=n):A+=u}},_generateLinePositionsPlaceAtCenter:function(b,a,c,k,d,e,f,g,l,h,n){var m,p,t,r,w,v,u,q;for(g=0;g<b.paths.length;g++){var y=b.paths[g];if(!(2>y.length)){if(2==y.length){r=y[0];m=y[1];t=r[0];r=r[1];
y=m[0];v=m[1];w=(y-t)*(y-t)+(v-r)*(v-r);u=Math.atan2(v-r,y-t);v=Math.cos(u);u=Math.sin(u);y=[];q=t;for(var z=r;(q-t)*(q-t)+(z-r)*(z-r)<w;)y.push([q,z]),q+=c/2*v,z+=c/2*u;y.push(m)}var A=0;for(m=0;m<y.length-1;m++)t=y[m][0],r=y[m][1],w=y[m+1][0],v=y[m+1][1],u=w-t,q=v-r,A+=Math.sqrt(u*u+q*q);for(m=z=0;m<y.length-1;m++){t=y[m][0];r=y[m][1];w=y[m+1][0];v=y[m+1][1];u=w-t;q=v-r;u=Math.sqrt(u*u+q*q);if(z+u>A/2)break;z+=u}m==y.length-1&&m--;t=y[m][0];r=y[m][1];w=y[m+1][0];v=y[m+1][1];u=w-t;q=v-r;z=A/2-z;
u=Math.atan2(q,u);q=t+z*Math.cos(u);u=r+z*Math.sin(u);t=this._angleAndShifts(t,r,w,v,f,l,h);n.push({x:q+t.shiftX,y:u+t.shiftY,angle:t.angle});var A=q,F=u,z=0;for(p=m;p<y.length-1;p++)p==m?(t=A,r=F):(t=y[p][0],r=y[p][1]),w=y[p+1][0],v=y[p+1][1],u=w-t,q=v-r,u=Math.sqrt(u*u+q*q),z=z+u>c?this._generatePositionsOnLine(b.spatialReference,a,c,c,z,t,r,w,v,k,d,e,f,l,h,n):z+u;z=0;for(p=m;0<=p;p--)p==m?(t=A,r=F):(t=y[p+1][0],r=y[p+1][1]),w=y[p][0],v=y[p][1],u=w-t,q=v-r,u=Math.sqrt(u*u+q*q),z=z+u>c?this._generatePositionsOnLine(b.spatialReference,
a,c,c,z,t,r,w,v,k,d,e,f,l,h,n):z+u}}},_generatePositionsOnLine:function(b,a,c,k,d,e,f,g,l,p,h,m,x,t,r,w){p=Math.atan2(l-f,g-e);h=e;m=f;var n=h,u=m;do if(d=c-d,h+=d*Math.cos(p),m+=d*Math.sin(p),this._belongs(h,m,e,f,g,l))d=this._angleAndShifts(e,f,g,l,x,t,r),c=h+d.shiftX,u=m+d.shiftY,a?this._labelLayer._isWithinScreenArea(new D(c,u,c,u,b))&&w.push({x:c,y:u,angle:d.angle}):w.push({x:c,y:u,angle:d.angle}),n=h,u=m,d=0,c=k;else return b=g-n,l-=u,Math.sqrt(b*b+l*l);while(1)},_postSorting:function(b,a,c){if(b&&
0<a.length){var k=.5*(b.xmin+b.xmax);b=.5*(b.ymin+b.ymax);for(var d=a[0].x,e=a[0].y,f=Math.sqrt((d-k)*(d-k)+(e-b)*(e-b)),g=a[0].angle,l=0;l<a.length;l++){var p=a[l].x,h=a[l].y,m=Math.sqrt((p-k)*(p-k)+(h-b)*(h-b));m<f&&(d=p,e=h,f=m,g=a[l].angle)}c.push({x:d,y:e,angle:g})}},_belongs:function(b,a,c,k,d,e){if(d==c&&e==k)return!1;if(d>c){if(b>d||b<c)return!1}else if(b<d||b>c)return!1;if(e>k){if(a>e||a<k)return!1}else if(a<e||a>k)return!1;return!0},_angleAndShifts:function(b,a,c,k,d,e,f){for(b=Math.atan2(k-
a,c-b);b>Math.PI/2;)b-=Math.PI;for(;b<-(Math.PI/2);)b+=Math.PI;k=Math.sin(b);var g=Math.cos(b);c=a=0;"Above"==e&&(a=d*k*this._scale,c=d*g*this._scale);"Below"==e&&(a=-d*k*this._scale,c=-d*g*this._scale);d=[];d.angle=f?-b:0;d.shiftX=-a;d.shiftY=c;return d},_generatePolygonPositionsForManyLabels:function(b,a,c,k,d,e,f){d=this._findCentroidForRing(b);k=d[0];var g=d[1],l=this._calcRingExtent(b);d=l.xmin;e=l.ymin;var h=l.xmax,l=l.ymax,n=(l-e)/(this._map.height*this._scale);if(!(10<(h-d)/(this._map.width*
this._scale)&&10<n)){var m=!0;if(h-d>this._map.width*this._scale||l-e>this._map.height*this._scale)m=!1;var n=this._map.width*this._scale*(m?.1875:.5),m=this._map.height*this._scale*(m?.1875:.5),x=!0,t=!0,r=0;do{g+=(r%2?-1:1)*r*m;if(this._scanRingByX(c,a,b,k,g,d,h,n,f))break;g<e&&(x=!1);g>l&&(t=!1);r++}while(x||t)}},_scanRingByX:function(b,a,c,k,d,e,f,g,l){var h=!0,n=!0,m=0,x=1E3;do{k+=(m%2?-1:1)*m*g;var t=this._movePointInsideRing(c,k,d),r=this._labelLayer._isWithinScreenArea(new D(t,d,t,d,a)),w=
this._isPointWithinRing(b,c,t,d);if(r&&w)return l.push({x:t,y:d}),!0;k<e&&(h=!1);k>f&&(n=!1);m++;x--;if(0>=x)return!0}while(h||n);return!1},_movePointInsideRing:function(b,a,c){for(var k=[],d=b.length-1,e=b[0][1]>=b[d][1]?1:-1,f=0;f<=d;f++){var g=f,l=f+1;f==d&&(l=0);var h=b[g][0],g=b[g][1],n=b[l][0],l=b[l][1],m=l>=g?1:-1;if(g<=c&&c<=l||l<=c&&c<=g)c!=g&&c!=l?(k.push((c-g)*(n-h)/(l-g)+h),e=m):c==g&&c!=l?(e!=m&&k.push(h),e=m):c!=g&&c==l?(k.push(n),e=m):c==g&&c==l&&(1==e&&k.push(h),k.push(n),e=m)}k.sort(function(a,
b){return a-b});b=k.length;if(0<b){for(f=c=a=0;f<b-1;f+=2)d=Math.abs(k[f+1]-k[f]),d>a&&(a=d,c=f);a=(k[c]+k[c+1])/2}return a},_calcRingExtent:function(b){var a,c;c=new D;for(a=0;a<b.length-1;a++){var k=b[a][0],d=b[a][1];if(void 0===c.xmin||k<c.xmin)c.xmin=k;if(void 0===c.ymin||d<c.ymin)c.ymin=d;if(void 0===c.xmax||k>c.xmax)c.xmax=k;if(void 0===c.ymax||d>c.ymax)c.ymax=d}return c},_isPointWithinPolygon:function(b,a,c,k){var d;for(d=0;d<a.rings.length;d++)if(this._isPointWithinRing(b,a.rings[d],c,k))return!0;
return!1},_isPointWithinRing:function(b,a,c,k){var d,e,f,g,l=[],h=a.length;for(b=0;b<h-1;b++)if(d=a[b][0],e=a[b][1],f=a[b+1][0],g=a[b+1][1],d!=f||e!=g){if(e==g)if(k==e)l.push(d);else continue;d==f?(e<g&&k>=e&&k<g&&l.push(d),e>g&&k<=e&&k>g&&l.push(d)):(e=(f-d)/(g-e)*(k-e)+d,d<f&&e>=d&&e<f&&l.push(e),d>f&&e<=d&&e>f&&l.push(e))}l.sort(function(a,b){return a-b});for(b=0;b<l.length-1;b++)if(d=l[b],f=l[b+1],c>=d&&c<f)if(b%2)break;else return!0;return!1},_findCentroidForRing:function(b){for(var a=b.length,
c=[0,0],k=0,d=b[0][0],e=b[0][1],f=1;f<a-1;f++){var g=b[f][0],l=b[f][1],h=b[f+1][0],n=b[f+1][1],m=(g-d)*(n-e)-(h-d)*(l-e);c[0]+=m*(d+g+h);c[1]+=m*(e+l+n);k+=m}c[0]/=3*k;c[1]/=3*k;return c},_findCentroidForFeature:function(b){for(var a=0,c=[0,0],k=0;k<b.rings.length;k++)for(var d=b.rings[k],e=d.length,f=d[0][0],g=d[0][1],l=1;l<e-1;l++){var h=d[l][0],n=d[l][1],m=d[l+1][0],x=d[l+1][1],t=(h-f)*(x-g)-(m-f)*(n-g);c[0]+=t*(f+h+m);c[1]+=t*(g+n+x);a+=t}c[0]/=3*a;c[1]/=3*a;return c},_findPlace:function(b,a,
c,k,d,e,f){if(isNaN(c)||isNaN(k))return!1;for(var g=0;g<this._placedLabels.length;g++){var l=this._placedLabels[g].angle,p=this._placedLabels[g].width*this._scale,n=this._placedLabels[g].height*this._scale,m=this._placedLabels[g].x-c,x=this._placedLabels[g].y-k;if(0===d&&0===l){if(this._findPlace2(-e*this._scale,-f*this._scale,e*this._scale,f*this._scale,m-p,x-n,m+p,x+n))return!1}else{var t=new D(-e*this._scale,-f*this._scale,e*this._scale,f*this._scale,null),r=0,w=1;0!==d&&(r=Math.sin(d),w=Math.cos(d));
var v=m*w-x*r,m=m*r+x*w,l=l-d,r=Math.sin(l),w=Math.cos(l),u=-p*w- -n*r,x=-p*r+-n*w,l=+p*w- -n*r,q=+p*r+-n*w,p=v+u,n=m-x,r=v+l,w=m-q,u=v-u,x=m+x,v=v-l,m=m+q,l=new h;l.addRing([[p,n],[r,w],[u,x],[v,m],[p,n]]);if(t.intersects(l))return!1}}for(;d>Math.PI/2;)d-=Math.PI;for(;d<-(Math.PI/2);)d+=Math.PI;g={};g.layer=b;g.text=a;g.angle=d;g.x=c;g.y=k;g.width=e;g.height=f;this._placedLabels.push(g);return!0},_findPlace2:function(b,a,c,k,d,e,f,g){return(b>=d&&b<=f||c>=d&&c<=f||b<=d&&c>=f)&&(a>=e&&a<=g||k>=e&&
k<=g||a<=e&&k>=g)?!0:!1}})})},"*noref":1}});
define("esri/layers/LabelLayer","require dojo/_base/declare dojo/_base/lang dojo/number dojo/i18n!dojo/cldr/nls/number dojo/_base/array dojo/_base/connect dojo/has dojox/gfx/_base ../kernel ../lang ../graphic ../PopupInfo ./labelLayerUtils/DynamicLabelClass ./labelLayerUtils/StaticLabelClass ../symbols/TextSymbol ../symbols/ShieldLabelSymbol ../geometry/Extent ../geometry/Point ../geometry/webMercatorUtils ./GraphicsLayer ./LabelClass ../renderers/SimpleRenderer ../renderers/arcadeUtils".split(" "),function(C,
H,B,I,D,E,h,b,a,c,k,d,e,f,g,l,p,n,m,x,t,r,w,v){function u(a){return"sizeInfo"===a.type}C=H(t,{declaredClass:"esri.layers.LabelLayer",constructor:function(a){this._refreshLabels=B.hitch(this,this._refreshLabels);this.id="labels";this.featureLayers=[];this._featureLayerInfos=[];this._preparedLabels=[];this._engineType="STATIC";this._mapEventHandlers=[];a&&(a.id&&(this.id=a.id),a.mode&&(this._engineType="DYNAMIC"===a.mode.toUpperCase()?"DYNAMIC":"STATIC"))},_setMap:function(a){this._mapEventHandlers.push(a.on("extent-change",
B.hitch(this,"_handleLevelChange")));var b=this.inherited(arguments);this.refresh();return b},_unsetMap:function(){var a;for(a=0;a<this._mapEventHandlers.length;a++)h.disconnect(this._mapEventHandlers[a]);this.refresh();clearTimeout(this._refreshHandle);this._refreshHandle=null;this.inherited(arguments)},setAlgorithmType:function(a){this._engineType=a&&"DYNAMIC"===a.toUpperCase()?"DYNAMIC":"STATIC";this.refresh()},addFeatureLayer:function(a,b,c,f){if(!this.getFeatureLayer(a.layerId)){var e=[];e.push(a.on("update-end",
B.hitch(this,"refresh")));e.push(a.on("suspend",B.hitch(this,"refresh")));e.push(a.on("resume",B.hitch(this,"refresh")));e.push(a.on("edits-complete",B.hitch(this,"refresh")));e.push(a.on("labeling-info-change",B.hitch(this,"refresh")));e.push(a.on("time-extent-change",B.hitch(this,"refresh")));e.push(a.on("show-labels-change",B.hitch(this,"refresh")));this._featureLayerInfos.push({FeatureLayer:a,LabelExpressionInfo:c,LabelingOptions:f,LabelRenderer:b,EventHandlers:e});this.featureLayers.push(a);
this.refresh()}},getFeatureLayer:function(a){var b,c;for(b=0;b<this.featureLayers.length;b++)if(c=this.featureLayers[b],void 0!==c&&c.id==a)return c;return null},removeFeatureLayer:function(a){var b;a=this.getFeatureLayer(a);if(void 0!==a&&(b=E.indexOf(this.featureLayers,a),-1<b)){this.featureLayers.splice(b,1);for(a=0;a<this._featureLayerInfos[b].EventHandlers.length;a++)h.disconnect(this._featureLayerInfos[b].EventHandlers[a]);this._featureLayerInfos.splice(b,1);this.refresh()}},removeAllFeatureLayers:function(){var a;
for(a=0;a<this.featureLayers.length;a++){for(var b=0;b<this._featureLayerInfos[a].EventHandlers.length;b++)h.disconnect(this._featureLayerInfos[a].EventHandlers[b]);this.featureLayers=[];this._featureLayerInfos=[]}this.refresh()},getFeatureLayers:function(){return this.featureLayers},getFeatureLayerInfo:function(a){var b,c;for(b=0;b<this.featureLayers.length;b++)if(c=this.featureLayers[b],void 0!==c&&c.id==a)return this._featureLayerInfos[b];return null},refresh:function(){null==this._refreshHandle&&
(this._refreshHandle=setTimeout(this._refreshLabels,0))},_handleLevelChange:function(a){a.levelChange&&this.clear();this.refresh()},_refreshLabels:function(a){this._refreshHandle=null;var b,c,e,d,k,q=[],l,h="DYNAMIC"===this._engineType?new f:new g;if(this._map){h.setMap(this._map,this);this._preparedLabels=[];for(a=0;a<this.featureLayers.length;a++)if(c=this.featureLayers[a],c.visible&&c.showLabels&&c.visibleAtMapScale&&!c._suspended)if(b=this._featureLayerInfos[a],k=this._convertOptions(null),b.LabelRenderer){if(q=
c.labelingInfo)if(l=q[0])d=this._getLabelExpression(l),k=this._convertOptions(l);e=b.LabelRenderer;b.LabelExpressionInfo&&(d=b.LabelExpressionInfo);b.LabelingOptions&&(k=this._convertOptions(null),void 0!==b.LabelingOptions.pointPriorities&&(q=b.LabelingOptions.pointPriorities,k.pointPriorities="above-center"==q||"AboveCenter"==q||"esriServerPointLabelPlacementAboveCenter"==q?"AboveCenter":"above-left"==q||"AboveLeft"==q||"esriServerPointLabelPlacementAboveLeft"==q?"AboveLeft":"above-right"==q||"AboveRight"==
q||"esriServerPointLabelPlacementAboveRight"==q?"AboveRight":"below-center"==q||"BelowCenter"==q||"esriServerPointLabelPlacementBelowCenter"==q?"BelowCenter":"below-left"==q||"BelowLeft"==q||"esriServerPointLabelPlacementBelowLeft"==q?"BelowLeft":"below-right"==q||"BelowRight"==q||"esriServerPointLabelPlacementBelowRight"==q?"BelowRight":"center-center"==q||"CenterCenter"==q||"esriServerPointLabelPlacementCenterCenter"==q?"CenterCenter":"center-left"==q||"CenterLeft"==q||"esriServerPointLabelPlacementCenterLeft"==
q?"CenterLeft":"center-right"==q||"CenterRight"==q||"esriServerPointLabelPlacementCenterRight"==q?"CenterRight":"AboveRight"),void 0!==b.LabelingOptions.lineLabelPlacement&&(k.lineLabelPlacement=b.LabelingOptions.lineLabelPlacement),void 0!==b.LabelingOptions.lineLabelPosition&&(k.lineLabelPosition=b.LabelingOptions.lineLabelPosition),void 0!==b.LabelingOptions.labelRotation&&(k.labelRotation=b.LabelingOptions.labelRotation),void 0!==b.LabelingOptions.howManyLabels&&(k.howManyLabels=b.LabelingOptions.howManyLabels));
e instanceof r&&(d=this._getLabelExpression(e),e=new w(e.symbol),k=this._convertOptions(e));this._addLabels(c,e,d,k)}else if(q=c.labelingInfo)for(b=q.length-1;0<=b;b--)if(l=q[b])e=new r(l instanceof r?l.toJson():l),d=this._getLabelExpression(l),k=this._convertOptions(l),this._addLabels(c,e,d,k);d=h._process(this._preparedLabels);this.clear();this.drawLabels(this._map,d)}},drawLabels:function(a,b){this._scale=(a.extent.xmax-a.extent.xmin)/a.width;var c;for(c=0;c<b.length;c++){var e=b[c],f=e.x,q=e.y,
k=e.text,g=e.angle,h=e.layer.labelSymbol;"polyline"==e.layer.geometry.type&&e.layer.options.labelRotation&&h.setAngle(180/Math.PI*g);h.setText(k);e=f;h instanceof l&&(f=h.getHeight(),e-=.25*f*this._scale*Math.sin(g),q-=.33*f*this._scale);g=new d(new m(e,q,a.extent.spatialReference));g.setSymbol(h);this.add(g)}},_addLabels:function(a,b,c,e){var f,d,k,q;if(this._isWithinScaleRange(b.minScale,b.maxScale)&&c&&""!==c){var g=this._map,l=!a.url&&!g.spatialReference.equals(a.spatialReference);for(f=0;f<a.graphics.length;f++)if(d=
a.graphics[f],!1!==d.visible){k=d.geometry;if(l){if(!x.canProject(k,g))continue;k=x.project(k,g)}k&&this._isWhere(b.where,d.attributes)&&this._isWithinScreenArea(k)&&(q=this._buildLabelText(c,d,a.fields,e),this._addLabel(q,b,a.renderer,d,e,k,g))}}},_isWithinScreenArea:function(a){a="point"===a.type?new n(a.x,a.y,a.x,a.y,a.spatialReference):a.getExtent();if(void 0===a)return!1;a=this._intersects(this._map,a);return null===a||0===a.length?!1:!0},_isWithinScaleRange:function(a,b){var c=this._map.getScale();
return 0<a&&c>=a||0<b&&c<=b?!1:!0},_isWhere:function(a,b){try{if(!a)return!0;if(a){var c=a.split(" ");if(3===c.length)return this._sqlEquation(b[this._removeQuotes(c[0])],c[1],this._removeQuotes(c[2]));if(7===c.length){var e=this._sqlEquation(b[this._removeQuotes(c[0])],c[1],this._removeQuotes(c[2])),f=c[3],d=this._sqlEquation(b[this._removeQuotes(c[4])],c[5],this._removeQuotes(c[6]));switch(f){case "AND":return e&&d;case "OR":return e||d}}}return!1}catch(G){console.log("Error.: can't parse \x3d "+
a)}},_sqlEquation:function(a,b,c){switch(b){case "\x3d":return a==c?!0:!1;case "\x3c\x3e":return a!=c?!0:!1;case "\x3e":return a>c?!0:!1;case "\x3e\x3d":return a>=c?!0:!1;case "\x3c":return a<c?!0:!1;case "\x3c\x3d":return a<=c?!0:!1}return!1},_removeQuotes:function(a){var b=a.indexOf('"'),c=a.lastIndexOf('"');if(-1!=b&&-1!=c)return a.substr(1,a.length-2);b=a.indexOf("'");c=a.lastIndexOf("'");return-1!=b&&-1!=c?a.substr(1,a.length-2):a},_getSizeInfo:function(a){return a?a.sizeInfo||E.filter(a.visualVariables,
u)[0]:null},_addLabel:function(b,c,e,f,d,k,g){var h,m,q,n;if(b&&""!==B.trim(b)&&c){b=b.replace(/\s+/g," ");h=c.getSymbol(f);h instanceof l?(h=new l(h.toJson()),h.setVerticalAlignment("baseline"),h.setHorizontalAlignment("center")):h=h instanceof p?new p(h.toJson()):new l;h.setText(b);c.symbol=h;if(q=this._getProportionalSize(c.sizeInfo,f.attributes))h instanceof l?h.setSize(q):h instanceof p&&(h.setWidth(q),h.setHeight(q));n=q=0;if(e){m=e.getSymbol(f);var r=this._getSizeInfo(e),t;r&&(t=e.getSize(f,
{sizeInfo:r,resolution:g.getResolutionInMeters()}));if(t&&null!==t)q=n=t;else if(m)if("simplemarkersymbol"==m.type)n=q=m.size;else if("picturemarkersymbol"==m.type)q=m.width,n=m.height;else if("simplelinesymbol"==m.type||"cartographiclinesymbol"==m.type)q=m.width}e={};e.graphic=f;e.options=d;e.geometry=k;e.labelRenderer=c;e.labelSymbol=h;e.labelWidth=h.getWidth()/2;e.labelHeight=h.getHeight()/2;e.symbolWidth=a.normalizedLength(q)/2;e.symbolHeight=a.normalizedLength(n)/2;e.text=b;e.angle=h.angle;this._preparedLabels.push(e)}},
_buildLabelText:function(a,b,c,f){if(f.hasExpression)return a=v.executeFunction(f.compiledFunc,v.createExecContext(b,b._getView())),k.isDefined(a)?""+a:"";var d=b.attributes;return a.replace(/{[^}]*}/g,function(a){var b,g=a;for(b=0;b<c.length;b++)if("{"+c[b].name+"}"==a){var g=d[c[b].name],h=c[b].domain;if(h&&B.isObject(h)){if("codedValue"==h.type&&f.useCodedValues)for(b=g,a=0;a<h.codedValues.length;a++){if(h.codedValues[a].code==b){g=h.codedValues[a].name;break}}else"range"==h.type&&h.minValue<=
g&&g<=h.maxValue&&(g=h.name);break}h=c[b].type;if(f.fieldInfos){var l=f.fieldInfos;for(b=0;b<l.length;b++)if("{"+l[b].fieldName+"}"==a){a=l[b].format;"esriFieldTypeDate"==h?(a="DateFormat"+e.prototype._dateFormats[a.dateFormat?a.dateFormat:"shortDate"])&&(g=k.substitute({myKey:g},"${myKey:"+a+"}")):"esriFieldTypeInteger"!=h&&"esriFieldTypeSingle"!=h&&"esriFieldTypeSmallInteger"!=h&&"esriFieldTypeLong"!=h&&"esriFieldTypeDouble"!=h||!a||(g=I.format(g,{places:a.places}),a.digitSeparator||D.group&&(g=
g.replace(new RegExp("\\"+D.group,"g"),"")));break}}break}else g="";return null==g?"":g})},_getLabelExpression:function(a){var b="";a.labelExpressionInfo?b=a.labelExpressionInfo.value||a.labelExpressionInfo.expression:this._validSyntax(a.labelExpression)&&(b=this._convertLabelExpression(a.labelExpression));return b},_validSyntax:function(a){return/^(\s*\[[^\]]+\]\s*)+$/i.test(a)},_convertLabelExpression:function(a){return a.replace(RegExp("\\[","g"),"{").replace(RegExp("\\]","g"),"}")},_getProportionalSize:function(a,
b){if(!a)return null;var c=k.substitute(b,"${"+a.field+"}",{first:!0});return!(a.minSize&&a.maxSize&&a.minDataValue&&a.maxDataValue&&c)||0>=a.maxDataValue-a.minDataValue?null:(a.maxSize-a.minSize)/(a.maxDataValue-a.minDataValue)*(c-a.minDataValue)+a.minSize},_convertOptions:function(a){var b=!0,c="shortDate",e=null,f=null,d="",g=!0,h,k;if(a&&(a.format&&(c=a.format.dateFormat,e={places:a.format.places,digitSeparator:a.format.digitSeparator}),f=a.fieldInfos,d=a.labelPlacement,null!=a.useCodedValues&&
(b=a.useCodedValues),a=a.labelExpressionInfo)){var l=a.expression;l&&!a.value&&(k=!0,h=v.createFunction(l))}if("always-horizontal"==d||"esriServerPolygonPlacementAlwaysHorizontal"==d)g=!1;return{useCodedValues:b,dateFormat:c,numberFormat:e,fieldInfos:f,pointPriorities:"above-center"==d||"esriServerPointLabelPlacementAboveCenter"==d?"AboveCenter":"above-left"==d||"esriServerPointLabelPlacementAboveLeft"==d?"AboveLeft":"above-right"==d||"esriServerPointLabelPlacementAboveRight"==d?"AboveRight":"below-center"==
d||"esriServerPointLabelPlacementBelowCenter"==d?"BelowCenter":"below-left"==d||"esriServerPointLabelPlacementBelowLeft"==d?"BelowLeft":"below-right"==d||"esriServerPointLabelPlacementBelowRight"==d?"BelowRight":"center-center"==d||"esriServerPointLabelPlacementCenterCenter"==d?"CenterCenter":"center-left"==d||"esriServerPointLabelPlacementCenterLeft"==d?"CenterLeft":"center-right"==d||"esriServerPointLabelPlacementCenterRight"==d?"CenterRight":"AboveRight",lineLabelPlacement:"above-start"==d||"below-start"==
d||"center-start"==d?"PlaceAtStart":"above-end"==d||"below-end"==d||"center-end"==d?"PlaceAtEnd":"PlaceAtCenter",lineLabelPosition:"above-after"==d||"esriServerLinePlacementAboveAfter"==d||"above-along"==d||"esriServerLinePlacementAboveAlong"==d||"above-before"==d||"esriServerLinePlacementAboveBefore"==d||"above-start"==d||"esriServerLinePlacementAboveStart"==d||"above-end"==d||"esriServerLinePlacementAboveEnd"==d?"Above":"below-after"==d||"esriServerLinePlacementBelowAfter"==d||"below-along"==d||
"esriServerLinePlacementBelowAlong"==d||"below-before"==d||"esriServerLinePlacementBelowBefore"==d||"below-start"==d||"esriServerLinePlacementBelowStart"==d||"below-end"==d||"esriServerLinePlacementBelowEnd"==d?"Below":"center-after"==d||"esriServerLinePlacementCenterAfter"==d||"center-along"==d||"esriServerLinePlacementCenterAlong"==d||"center-before"==d||"esriServerLinePlacementCenterBefore"==d||"center-start"==d||"esriServerLinePlacementCenterStart"==d||"center-end"==d||"esriServerLinePlacementCenterEnd"==
d?"OnLine":"Above",labelRotation:g,howManyLabels:"OneLabel",hasExpression:k,compiledFunc:h}}});b("extend-esri")&&B.setObject("layers.LabelLayer",C,c);return C});
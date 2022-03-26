class Maps{constructor(){this.opacityTransision=!1,this.currentMap1=0,this.currentMap2=Math.floor(3*Math.random()),this.timer=0,this.changeTo=0,this.offset=400,this.clipX=c.width,this.current=1,this.opacity=1,this.time=6e3,this.cloud1Pos={x:0},this.cloud2Pos={x:0},this.cloud3Pos={x:0},this.cloud4Pos={x:0},this.cloud5Pos={x:0},this.moveSpeed=.1,this.windParticleSystem=new WindParticleSystem(500)}drawNormal(t){this.drawMap(t),SETTINGS.movingBackground&&this.update()}drawTransition(t){this.drawFade(t),this.transitionUpdate()}drawFade(t){this.opacityTransision?(this.drawMap(this.changeTo),t&&this.drawTitle(this.changeTo),ctx.save(),ctx.globalAlpha=this.opacity,this.drawMap(this.currentMap2),t&&this.drawTitle(this.currentMap2),ctx.restore(),this.opacity-=.001*dt,this.opacity<=0&&(this.opacityTransision=!1,this.opacity=1,this.currentMap2=this.changeTo)):(this.drawMap(this.currentMap2),t&&this.drawTitle(this.currentMap2)),1==SETTINGS.movingBackground&&this.update()}drawTitle(t){switch(t){case 0:ctx.drawImage(titleImage,0,0,1389,198,c.width/2-694,c.height/2-300,1389,198);break;case 1:ctx.drawImage(titleImage,0,198.25,1389,198,c.width/2-694,c.height/2-300,1389,198);break;case 2:ctx.drawImage(titleImage,0,396.5,1389,198,c.width/2-694,c.height/2-300,1389,198);break;case 3:ctx.drawImage(titleImage,0,594.75,1389,198,c.width/2-694,c.height/2-300,1389,198)}}drawMap(t){switch(t){case 0:this.drawWater();break;case 1:this.drawFire();break;case 2:this.drawAir();break;case 3:this.drawEarth()}1==SETTINGS.windParticles&&this.windParticleSystem.draw()}update(){this.cloud1Pos.x-=this.moveSpeed*dt,this.cloud2Pos.x-=.9*this.moveSpeed*dt,this.cloud3Pos.x-=.5*this.moveSpeed*dt,this.cloud4Pos.x-=.2*this.moveSpeed*dt,this.cloud5Pos.x-=this.moveSpeed*dt,this.cloud1Pos.x<=-c.width&&(this.cloud1Pos.x=0),this.cloud2Pos.x<=-c.width&&(this.cloud2Pos.x=0),this.cloud3Pos.x<=-c.width&&(this.cloud3Pos.x=0),this.cloud4Pos.x<=-c.width&&(this.cloud4Pos.x=0),this.cloud5Pos.x<=-c.width&&(this.cloud5Pos.x=0)}transitionUpdate(){if(this.timer+=dt,this.timer>=this.time){this.timer=0;let t=this.currentMap1+1;t>=4&&(t=0),this.transisionTo(t);let i=this.currentMap2+1;i>=4&&(i=0),this.transisionTo(i)}}drawWater(){ctx.fillStyle="#08a9fc",ctx.fillRect(0,0,c.width,c.height),ctx.drawImage(waterMapCloud4,this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud4,c.width+this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(waterMapMountains,0,0,c.width,c.height),ctx.drawImage(waterMapCloud3,this.cloud3Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud3,c.width+this.cloud3Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud2,this.cloud2Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud2,c.width+this.cloud2Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud1,this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud1,c.width+this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloudSingle,this.cloud5Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloudSingle,c.width+this.cloud5Pos.x,0,c.width,c.height)}drawFire(){ctx.fillStyle="#ff4c3c",ctx.fillRect(0,0,c.width,c.height),ctx.drawImage(fireMapCloud4,this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloud4,c.width+this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(fireMapVolcano,0,0,c.width,c.height),ctx.drawImage(fireMapCloud3,this.cloud3Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloud3,c.width+this.cloud3Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloud2,this.cloud2Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloud2,c.width+this.cloud2Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloud1,this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloud1,c.width+this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloudSingle,this.cloud5Pos.x,0,c.width,c.height),ctx.drawImage(fireMapCloudSingle,c.width+this.cloud5Pos.x,0,c.width,c.height)}drawEarth(){ctx.fillStyle="#74e3f5",ctx.fillRect(0,0,c.width,c.height),ctx.drawImage(earthMapHill3,0,0,c.width,c.height),ctx.drawImage(earthMapHill2,0,0,c.width,c.height),ctx.drawImage(earthMapCloud2,this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(earthMapCloud2,c.width+this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(earthMapHill1,0,0,c.width,c.height),ctx.drawImage(earthMapCloud1,this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(earthMapCloud1,c.width+this.cloud1Pos.x,0,c.width,c.height)}drawAir(){ctx.fillStyle="#08a9fc",ctx.fillRect(0,0,c.width,c.height),ctx.drawImage(waterMapCloud4,this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud4,c.width+this.cloud4Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud3,this.cloud3Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud3,c.width+this.cloud3Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud2,this.cloud2Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud2,c.width+this.cloud2Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud1,this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloud1,c.width+this.cloud1Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloudSingle,this.cloud5Pos.x,0,c.width,c.height),ctx.drawImage(waterMapCloudSingle,c.width+this.cloud5Pos.x,0,c.width,c.height)}transisionTo(t){this.opacityTransision=!0,this.changeTo=t,this.clipX=c.width,this.opacity=1}}
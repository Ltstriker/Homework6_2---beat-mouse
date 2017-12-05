
var setInt_in_delay = new Array(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
var imge_mouse = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var setInt_change = new Array(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
var change_stop = new Array(true,true,true,true,true,true,true,true,true,true,true,true,true,true,true);
var state = new Array(1,1,1,1,1,1,1,1,1,1);//true when it is in
var Begin_Stop = null;
var _score = 0;
var _end_counter = null;

var _time = 30;
var time_counter= null;
var stopping = false;

window.onload = function()
{
  document.getElementById('button').onclick = start;
  for(var c1=1;c1<=15;c1++)
  {
    $('#mouse'+c1.toString()).bind('click',c1,_beat);
  }
}

function start()
{
  document.getElementById('button').innerHTML = 'stop';
  document.getElementById('button').onclick = _stop;
  Begin_Stop = window.setInterval(_random,1000);
  _end_counter = window.setTimeout(function()
  {
    document.getElementById('button').innerHTML = 'retry';
    document.getElementById('button').onclick = _init;
    document.getElementById("end").className = "end_out";
    document.getElementById("bar").className = "bar_out";
    document.getElementById("bar").innerHTML = "score : "+_score.toString();
  },30000);
  time_counter = window.setInterval(function(){
    if(_time<1)
      return;
    _time--;
    document.getElementById("time").innerHTML = _time.toString()+"s";
  },1000);
}

function _stop()
{
  document.getElementById('button').innerHTML = 'retry';
  document.getElementById('button').onclick = _init;
  stopping = true;
  window.clearInterval(Begin_Stop);
  window.clearInterval(time_counter);

  for(var c1=0;c1<15;c1++)
  {
    window.clearInterval(setInt_change[c1]);
    window.clearInterval(setInt_in_delay[c1]);
  }

  window.clearTimeout(_end_counter);
}

function _init()
{
  window.location.reload();
}


function _random(){
  var temp = parseInt(Math.random()*15+1);
  while(state[temp-1]>1)
  {
    temp = parseInt(Math.random()*15+1);
  }
  _out(temp);
}

function change(temp)
{
  if(imge_mouse[temp-1]==0)
    document.getElementById("mouse"+temp.toString()).className = 'mouse_up'+ (parseInt((temp-1)/5)+1).toString()+'  mouse_img2';
  else
    document.getElementById("mouse"+temp.toString()).className = 'mouse_up'+ (parseInt((temp-1)/5)+1).toString()+'  mouse_img1';
  imge_mouse[temp-1]=1-imge_mouse[temp-1];
}

function _out(temp)
{
  state[temp-1] = 2;
  setInt_change[temp-1] = window.setInterval(change,1000,temp);
  change_stop[temp-1] = false;
  setInt_in_delay[temp-1] = window.setTimeout(_in,5000,temp);
}

function _in(temp)
{
  state[temp-1] = 1;
  document.getElementById("mouse"+temp.toString()).className = 'mouse_down'+ (parseInt((temp-1)/5)+1).toString()+'  mouse_img1';
  if(!change_stop[temp-1])
    window.clearInterval(setInt_change[temp-1]);
}

function _beat(evnet)
{
  var temp = event.data;
  if(stopping ==true)
    return;
  if(state[temp-1]==3)
    return;
  else
    state[temp-1] = 3;
    _score++;
  document.getElementById("score").innerHTML = _score.toString();
  change_stop[temp-1]=false;
  window.clearInterval(setInt_change[temp-1]);
  document.getElementById("mouse"+temp.toString()).className = 'mouse_up'+ (parseInt((temp-1)/5)+1).toString()+'  mouse_img3';
  window.clearTimeout(setInt_in_delay[temp-1]);
  setInt_in_delay[temp-1]=window.setTimeout(_in,1500,temp);
}

//before 130

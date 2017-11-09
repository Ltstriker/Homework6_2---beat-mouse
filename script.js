
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
  document.getElementById('mouse1').onclick = function(){_beat(1)};
  document.getElementById('mouse2').onclick = function(){_beat(2)};
  document.getElementById('mouse3').onclick = function(){_beat(3)};
  document.getElementById('mouse4').onclick = function(){_beat(4)};
  document.getElementById('mouse5').onclick = function(){_beat(5)};
  document.getElementById('mouse6').onclick = function(){_beat(6)};
  document.getElementById('mouse7').onclick = function(){_beat(7)};
  document.getElementById('mouse8').onclick = function(){_beat(8)};
  document.getElementById('mouse9').onclick = function(){_beat(9)};
  document.getElementById('mouse10').onclick = function(){_beat(10)};
  document.getElementById('mouse11').onclick = function(){_beat(11)};
  document.getElementById('mouse12').onclick = function(){_beat(12)};
  document.getElementById('mouse13').onclick = function(){_beat(13)};
  document.getElementById('mouse14').onclick = function(){_beat(14)};
  document.getElementById('mouse15').onclick = function(){_beat(15)};
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

function _beat(temp)
{
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

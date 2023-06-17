function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    document.querySelector('.clock').textContent = time;
    setTimeout(updateClock, 1000);
  }

  function setAlarm() {
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var seconds = document.getElementById('seconds').value;
    var ampm = document.getElementById('ampm').value;
    var alarmTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    var listItem = document.createElement('li');
    listItem.textContent = alarmTime;
    document.getElementById('alarmList').appendChild(listItem);
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    document.getElementById('ampm').value = 'AM';
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = deleteAlarm;
    listItem.appendChild(deleteButton);
    document.getElementById('alarmList').appendChild(listItem);
    setTimeout(function () {
      alert('Alarm triggered: ' + alarmTime);
      listItem.remove();
    }, getTimeUntilAlarm(alarmTime));
  }

  function getTimeUntilAlarm(alarmTime) {
    var now = new Date();
    var alarm = new Date();
    var timeArray = alarmTime.split(':');
    var hours = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);
    var seconds = parseInt(timeArray[2].split(' ')[0]);
    var ampm = timeArray[2].split(' ')[1];

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    }

    alarm.setHours(hours, minutes, seconds, 0);

    if (alarm < now) {
      alarm.setDate(alarm.getDate() + 1);
    }

    return alarm - now;
  }
  function deleteAlarm(event) {
    var listItem = event.target.parentElement;
    listItem.remove();
  }

  updateClock();
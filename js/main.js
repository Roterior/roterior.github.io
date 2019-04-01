navigator.getBattery().then(function(battery) {
    LogBatteryLevel();
    battery.addEventListener('levelchange', LogBatteryLevel);
    function LogBatteryLevel() {
        var bat = battery.level * 100;
        var lvl = `Уровень заряда вашего устройства равен ${bat}%`;
        document.getElementById('charge').innerHTML = lvl;
    }
});

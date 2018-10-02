document.querySelector('#form').addEventListener('submit',(e)=>{

    document.querySelector('input[type="reset"]').classList.remove('hide');

    const form=e.currentTarget;

    let multipler = form.elements['multipler'].value;
    let fileSize = form.elements['fileSize'].value;
    let sizeType = form.elements['sizeType'].value;
    let speedSize = form.elements['speed'].value;
    let speedType = form.elements['speedType'].value;

    let size = CalcSize(fileSize, sizeType, multipler);

    let speed = CalcSpeed(speedSize, speedType, multipler);

    let time = ConvertToTime(Math.round(size/speed));

    const resultContent = document.querySelector('.result');
    resultContent.classList.remove('hide');

    document.querySelector('#resSpeed').innerHTML = `${speedSize} ${speedType}`;
    document.querySelector('#resSize').innerHTML = `${fileSize} ${sizeType.toUpperCase()}`;
    document.querySelector('#resTime').innerHTML = `${time}`;

    e.preventDefault();
});

CalcSize=(size, type, multipler)=>{
    switch(type){
        case 'bit': return size;
        case 'byte': return ConvertSize(size, multipler, 0);
        case 'kb': return ConvertSize(size, multipler);
        case 'mb': return ConvertSize(size, multipler, 2);
        case 'gb': return ConvertSize(size, multipler, 3);
        case 'tb': return ConvertSize(size, multipler, 4);
        case 'pt': return ConvertSize(size, multipler, 5);
        case 'eb': return ConvertSize(size, multipler, 6);
    }
}

CalcSpeed=(size, type, multipler)=>{
    switch(type){
        case 'bps': return size;
        case 'kbps': return ConvertSpeedSize(size, multipler, 1);
        case 'mbps': return ConvertSpeedSize(size, multipler, 2);
        case 'gbps': return ConvertSpeedSize(size, multipler, 3);
        case 'bs': return ConvertSpeedSize(size, multipler, 4);
        case 'kbs': return ConvertSpeedSize(size, multipler, 5);
        case 'mbs': return ConvertSpeedSize(size, multipler, 6);
        case 'gbs': return ConvertSpeedSize(size, multipler, 7);
    }
}

ConvertSize = (size, factor, repeat = 1) => {
    for(let i=0; i<repeat; i++){
        size*= factor;
    }
    return size * 8;
}

ConvertSpeedSize = (size, factor, repeat = 1) => {
    for(let i=0; i<repeat; i++){
        size*= factor;
    }
    return size;
}

ConvertToTime=(time)=>{
    const sec_num = parseInt(time, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    // if (hours   < 10) {hours   = "0"+hours;}
    // if (minutes < 10) {minutes = "0"+minutes;}
    // if (seconds < 10) {seconds = "0"+seconds;}
    return (hours=="00" ? '' : hours+' hours, ' ) + (hours=='00' && minutes =='00' ? '' : minutes + ' minutes and ') + seconds+ ' seconds';
}

Reset = ()=>{
    document.querySelector('input[type="reset"]').classList.add('hide');
    const resultContent = document.querySelector('.result');
    resultContent.classList.add('hide');

    document.querySelector('#resSpeed').innerHTML = '';
    document.querySelector('#resSize').innerHTML = '';
    document.querySelector('#resTime').innerHTML = '';
}
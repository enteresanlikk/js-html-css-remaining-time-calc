document.querySelector('#form').addEventListener('submit',(e)=>{

    document.querySelector('input[type="reset"]').classList.remove('hide');

    const form=e.currentTarget;
    const multipler = form.elements['multipler'];
    const fileSize = form.elements['fileSize'];
    const sizeType = form.elements['sizeType'];
    const speedSize = form.elements['speed'];
    const speedType = form.elements['speedType'];

    const size = CalcSize(fileSize.value, sizeType.value, multipler.value);
    const speed = CalcSpeed(speedSize.value, speedType.value, multipler.value);
    const time = ConvertToTime(Math.round(size/speed));

    const resultContent = document.querySelector('.result');
    resultContent.classList.remove('hide');

    document.querySelector('#resSpeed').innerHTML = `${speedSize.value} ${speedType[speedType.value].text}`;
    document.querySelector('#resSize').innerHTML = `${fileSize.value} ${sizeType[sizeType.value].text}`;
    document.querySelector('#resTime').innerHTML = `${time}`;

    e.preventDefault();
});

CalcSize=(size, type, multipler)=>{
    if(type <= -1)
        return size;
    else
        return ConvertSize(size, multipler, parseInt(type));
}

CalcSpeed=(size, type, multipler)=>{
    if(type <= -1)
        return size;
    else
        return ConvertSpeedSize(size, multipler, parseInt(type));
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
    const sec_num = parseInt(time, 10);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
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
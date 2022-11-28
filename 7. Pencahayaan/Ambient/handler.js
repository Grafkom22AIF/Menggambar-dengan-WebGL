function createBuffer(gl, type, bufferName, value){
    if(type == 'array'){
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferName);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value), gl.STATIC_DRAW);
    } else if(type == 'element'){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferName);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(value), gl.STATIC_DRAW);
    }
}

function createShader(gl, shaderCode, shaderSource){
    gl.shaderSource(shaderSource, shaderCode);
    gl.compileShader(shaderSource);
}

function infoPackage(gl, program, fSource, vSource){
    gl.attachShader(program, vSource);   
    gl.attachShader(program, fSource);   
    gl.linkProgram(program);
    gl.useProgram(program);
}

function locateArr(gl, varName){
    gl.vertexAttribPointer(varName, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(varName);
}

function onMouseClick(event){
    if(freeze) freeze = false;
    else freeze = true;
}

function onKeyDown(event){
    if(event.keyCode == 32) freeze = true;
}
function onKeyUp(event){
    if(event.keyCode == 32) freeze = false;
}

function prepareCanvas(gl, canvas){
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

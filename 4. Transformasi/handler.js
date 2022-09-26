function translasiObj2D(gl, program){
    var dx = 0.3, dy = 0.3, dz = 0.0;
    var translasi = gl.getUniformLocation(program, "uTranslasi");
    gl.uniform4f(translasi, dx, dy, dz, 0.0);
}

function skalasiObj2D(gl, program){
    var sx = 2.0, sy = 2.0, sz = 0.0;
    var matriksSkalasi = new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var skalasi = gl.getUniformLocation(program, "uSkalasi");
    gl.uniformMatrix4fv(skalasi, false, matriksSkalasi);
}

function shearObj2D(gl, program){
    
}
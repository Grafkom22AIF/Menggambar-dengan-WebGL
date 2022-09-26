function translasiObj2D(gl, program){
    var dx = 0.3, dy = 0.3, dz = 0.0;
    var translasi = gl.getUniformLocation(program, "uTranslasi");
    gl.uniform4f(translasi, dx, dy, dz, 0.0);
}
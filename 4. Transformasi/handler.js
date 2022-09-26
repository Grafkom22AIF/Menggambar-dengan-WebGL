function translasiObj2D(gl, program){
    var dx = 0.3, dy = 0.3, dz = 0.0;
    var translasi = gl.getUniformLocation(program, "uTranslasi");
    gl.uniform4f(translasi, dx, dy, dz, 0.0);
}

function skalasiObj2D(gl, program){
    var sx = -2.0, sy = 2.0, sz = 0.0;
    var matriksSkalasi = new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var skalasi = gl.getUniformLocation(program, "uMatriks");
    gl.uniformMatrix4fv(skalasi, false, matriksSkalasi);
}

function shearObj2D(gl, program){
    var angle = 30;
    var cota = 1/Math.tan(angle);
    var matriksShear = new Float32Array([
        1.0, cota, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var shear = gl.getUniformLocation(program, "uMatriks");
    gl.uniformMatrix4fv(shear, false, matriksShear);
}

function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
    return [
       0.5/ang, 0 , 0, 0,
       0, 0.5*a/ang, 0, 0,
       0, 0, -(zMax+zMin)/(zMax-zMin), -1,
       0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
    ];
 }

 function rotateZ(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8]; 

    m[0] = c*m[0]-s*m[1];
    m[4] = c*m[4]-s*m[5];
    m[8] = c*m[8]-s*m[9];
    m[1] = c*m[1]+s*mv0;
    m[5] = c*m[5]+s*mv4;
    m[9] = c*m[9]+s*mv8;
 }

 
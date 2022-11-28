var freeze = false;
function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var triangles = [
        0.0,0.0,0.5, 0.5,0.0,0.5, 0.5,0.0,0.0, 0.0,0.0,0.0,  //abcd
        0.0,0.0,0.5, 0.0,0.0,0.0, 0.25,0.5,0.25,             //ade
        0.5,0.0,0.0, 0.0,0.0,0.0, 0.25,0.5,0.25,             //cde
        0.5,0.0,0.5, 0.5,0.0,0.0, 0.25,0.5,0.25,             //bce
        0.0,0.0,0.5, 0.5,0.0,0.5, 0.25,0.5,0.25              //abe
    ];
    
    var colors = [
       1,0,0, 1,0,0, 1,0,0, 1,0,0,
       0,1,0, 0,1,0, 0,1,0,
       0,0,1, 0,0,1, 0,0,1,
       1,0,1, 1,0,1, 1,0,1,
       0,1,1, 0,1,1, 0,1,1
    ];

    var indices = [
       0,1,2, 0,2,3,
       4,5,6, 7,8,9,
       10,11,12, 13,14,15
    ];

    //vertex buffer
    var vertexBuffer = gl.createBuffer();
    createBuffer(gl, 'array', vertexBuffer, triangles);
    
    //color buffer
    var colorBuffer = gl.createBuffer();
    createBuffer(gl, 'array', colorBuffer, colors);

    //index buffer
    var indexBuffer = gl.createBuffer();
    createBuffer(gl, 'element', indexBuffer, indices);
    


    //mengambil dan menyimpan informasi vertex dari html dg document getElementById
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    //membuat vertex shader
    var vertexShader = gl.createShader( gl.VERTEX_SHADER );
    createShader(gl, vertexShaderCode, vertexShader);

    //mengambil dan menyimpan informasi fragment dari html dg document getElementByID
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    //membuat fragment shader
    var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    createShader(gl, fragmentShaderCode, fragmentShader);

    //menambahkan info shader ke package agar bisa dicompile
    var program = gl.createProgram();  
    infoPackage(gl, program, fragmentShader, vertexShader);

    //menambahkan vertices ke dalam aPosition dan aColor untuk digambar
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    locateArr(gl, aPosition);

    //color
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var aColor = gl.getAttribLocation(program, "aColor");
    locateArr(gl, aColor);
    
    var Pmatrix = gl.getUniformLocation(program, "uProj");
    var Vmatrix = gl.getUniformLocation(program, "uView");
    var Mmatrix = gl.getUniformLocation(program, "uModel");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var uAmbientColor = gl.getUniformLocation(program, "uAmbientColor");
    var uAmbientIntensity = gl.getUniformLocation(program, "uAmbientIntensity");
    gl.uniform3fv(uAmbientColor, [1.0, 1.0, 1.0]);
    gl.uniform1f(uAmbientIntensity, 0.9);

    
    var projmatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
        projmatrix,
        glMatrix.glMatrix.toRadian(90),
        1.0,
        0.5,
        10.0
    );
    var modmatrix = glMatrix.mat4.create();
    var viewmatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
        viewmatrix,
        [0.0, 0.0, 2.0],     //posisi kamera
        [0.0, 0.0, -2.0],    //arah kamera menghadap
        [0.0, 1.0, 0.0]     //arah atas kamera
    );

    document.addEventListener('click', onMouseClick, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
   
    var theta = glMatrix.glMatrix.toRadian(1);
    var animate = function(){
        if(!freeze){
            glMatrix.mat4.rotate(modmatrix, modmatrix, theta, [1.0, 1.0, 1.0]);
        }
        
        prepareCanvas(gl, canvas);

        gl.uniformMatrix4fv(Pmatrix, false, projmatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewmatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modmatrix);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(animate);
    }    
    animate(0);    
}
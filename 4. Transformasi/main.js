function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //mendefinisikan titik yg akan dibuat
    var vertices = [
        0.1, 0.5, 1.0, 0.0, 0.0,   //titik A red
        0.5, 0.5, 0.0, 1.0, 0.0,   //titik B green
        0.5, 0.1, 0.0, 0.0, 1.0,    //titik C blue
        0.1, 0.1, 1.0, 1.0, 1.0    //titik D white
    ];

    //membuat variabel sementara (temporary) untuk menyimpan koordinat sblm digambar
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //mengambil dan menyimpan informasi vertex dari html dg document getElementById
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    //membuat vertex shader
    var vertexShader = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //mengambil dan menyimpan informasi fragment dari html dg document getElementByID
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    //membuat fragment shader
    var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //menambahkan info shader ke package agar bisa dicompile
    var program = gl.createProgram();  
    gl.attachShader(program, vertexShader);   
    gl.attachShader(program, fragmentShader);   
    gl.linkProgram(program);
    gl.useProgram(program);

    //menambahkan vertices ke dalam aPosition dan aColor untuk digambar
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);    

    var PMatriks = gl.getUniformLocation(program, "upMatriks");
    var VMatriks = gl.getUniformLocation(program, "uvMatriks");
    var MMatriks = gl.getUniformLocation(program, "umMatriks");

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 100);
    var mov_matrix = [
        1,0,0,0,
        0,1,0,0, 
        0,0,1,0, 
        0,0,0,1];
    var view_matrix = [
        1,0,0,0, 
        0,1,0,0, 
        0,0,1,0, 
        0,0,0,1];

    view_matrix[14] = view_matrix[14]-1;

    var time_old = 0;
    var animate = function(time) {
        var dt = time-time_old;
        rotateZ(mov_matrix, dt*0.002);
        time_old = time;

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clearDepth(1.0);
        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(PMatriks, false, proj_matrix);
        gl.uniformMatrix4fv(VMatriks, false, view_matrix);
        gl.uniformMatrix4fv(MMatriks, false, mov_matrix);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        window.requestAnimationFrame(animate);
    }
    animate(0);
}

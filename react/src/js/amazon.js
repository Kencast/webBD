// AWS.config.update({
//     credentials: new AWS.Credentials(
//       "AKIAU6GDWULSQK4ETIOL",
//       "1UBey73znwyEDatrw8UpII6XCCBn0aHzKLIgmAf7"
//     ),
//     region: "us-east-2", // Por ejemplo, 'us-east-1'
//   });
//   console.log("aqui se configuro");
//   // Crea un objeto S3
//   const s3 = new AWS.S3();

//   console.log("se creo s3");
//   // Configuración para cargar el archivo en S3
//   const params = {
//     Bucket: "nature-bd-proyecto1",
//     Key: fecha,
//     Body: file,
//     ACL: "public-read", // Opcional: establece los permisos de acceso del archivo
//   };
//   console.log("se creo params");
//   // Realiza la carga del archivo en S3
//   s3.upload(params, function (err, data) {
//     if (err) {
//       console.error("Error al cargar la imagen en Amazon S3:", err);
//     } else {
//       console.log("Imagen cargada exitosamente en Amazon S3:", data.Location);
//       url = data.Location;
//       // Puedes mostrar la URL de la imagen cargada o realizar otras acciones después de la carga
//     }
//   });
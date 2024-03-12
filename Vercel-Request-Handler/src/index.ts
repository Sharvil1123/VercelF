import  express  from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "a15e4ff7159459f3722bd989844d7378",
    secretAccessKey:"2cff98ebc425c50e5f92dfadbb8f4042aeec87c6ba0f5d92dc3e6c90b4aa83e4",
    endpoint: "https://83ae6a046fbb74ba0a860706c6af3430.r2.cloudflarestorage.com",
  });

const app = express();

app.get("/*",async (req,res) => {
    const host = req.hostname;
    // console.log(host);
    const id = host.split(".")[0];
    // console.log(id);
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();

    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : 
    "application/javascript"
    res.set("Content-Type", type);
    res.send(contents.Body);
})
app.listen(3001);
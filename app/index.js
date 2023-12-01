const { Command } = require("commander");
const { Console } = require("console");
const program = new Command();

const http = require("http");

program
  .description("信息系统集成与管理课程实习") //Information Systems Integration and Management Course Internship
  .version("0.8.0")
  .option("-a, --add", "增加⼀条新的条⽬")
  .option("-d, --delete <id>", "对编号id的条⽬删除操作。")
  .option("-u, --update <id>", "对编号id的条⽬修改内容。")

  .option("-n, --name <name>", "姓名")
  .option("-i, --id <id>", "学号")
  .option("-m, --mobile <mobile>", "手机号")
  .option("-b, --hobby <hobby>", "兴趣爱好")

  .option(
    "-l, --list [mode]",
    "当mode是“descend”时【默认】，降序排列；当mode是“ascend”时，升序排列。输出到终端显示。" //可加"descend"默认值？
  );

program.parse(process.argv);
const options = program.opts();

//通过计数进行互斥判断
let count = 0;
arrays = ["add", "delete", "updata", "list"];
for (const option of arrays) {
  if (options[option]) {
    count += 1;
  }
}
//互斥判断
if ((count != 0) & (count != 1)) {
  console.log(`Error!  "add","delete","updata","list"互斥！！！`);
} else {
  //方法实现
  //添加
  if (options.add) {
    if (!(options.name && options.id && options.mobile && options.hobby)) {
      console.log(`参数缺失，请保证：--name --id --mobile --hobby的具备！`);
    } else {
      const { name, id, email, mobile, hobby } = options;
      // 调用 API
      const jsonData = {
        template: {
          data: [
            {
              username: name,
              IdNumber: id,
              email: email,
              phoneNumber: mobile,
              hobby: hobby,
            },
          ],
        },
      };
      const postData = JSON.stringify(jsonData);
      const http_options = {
        hostname: "127.0.0.1",
        port: 1337,
        path: "/api/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      };
      const req = http.request(http_options, (res) => {
        res.on("data", () => {
          console.log(
            `添加新条目: 姓名:${name}, 学号:${id}, 手机号:${mobile}, 兴趣爱好:${hobby}`
          );
        });
      });
      req.on("error", (error) => {
        console.error(error);
      });
      req.write(postData); // 使用write方法将数据写入请求的主体
      req.end();

      // 消息响应
      console.log(
        `添加新条目: 姓名:${name}, 学号:${id}, 手机号:${mobile}, 兴趣爱好:${hobby}`
      );
    }
  }

  //删除
  if (options.delete) {
    if (options.delete.startsWith("-"))
      console.log("error: option '-d, --delete <id>' argument missing");
    else {
      const uid = options.delete;
      // 调用 API
      // 在这里补充调用 API 的代码，使用 name、id、mobile 和 hobby 参数
      const http_options = {
        hostname: "127.0.0.1",
        port: 1337,
        path: "/api/" + uid,
        method: "DELETE",
      };
      const req = http.request(http_options, (res) => {
        res.on("data", () => {
          console.log(`成功`);
        });
      });
      req.on("error", (error) => {
        console.error(error);
      });
      req.end();
      console.log(`已经删除记录${uid}`);
    }
  }

  //更新
  if (options.update) {
    if (options.update.startsWith("-"))
      console.log("error: option '-u, --update <id>' argument missing");
    else {
      if (!(options.name || options.id || options.mobile || options.hobby)) {
        console.log(
          `参数缺失，请保证：--name --id --mobile --hobby任意参数的具备！`
        );
      }
      // 调用 API
      //GET 数据
      const uid = options.update;

      const { name, id, email, mobile, hobby } = options;
      const http_options_get = {
        hostname: "127.0.0.1",
        port: 1337,
        path: "/api/" + uid,
        method: "GET",
      };
      const req_get = http.request(http_options_get, (res) => {
        let responseData = "";
        res.on("data", (chunk) => {
          responseData += chunk;
        });
        res.on("end", () => {
          const data = JSON.parse(responseData);
          const items = data.collection.items;
          const dataItems = items[0].data;
          const dataItem_username = dataItems.find(
            (item) => item.name === "username"
          ).value;
          const dataItem_IdNumber = dataItems.find(
            (item) => item.name === "IdNumber"
          ).value;
          const dataItem_email = dataItems.find(
            (item) => item.name === "email"
          ).value;
          const dataItem_phoneNumber = dataItems.find(
            (item) => item.name === "phoneNumber"
          ).value;
          const dataItem_hobby = dataItems.find(
            (item) => item.name === "hobby"
          ).value;
          //PUT 数据
          const jsonData = {
            template: {
              data: [
                {
                  username: name || dataItem_username,
                  IdNumber: id || dataItem_IdNumber,
                  email: email || dataItem_email,
                  phoneNumber: mobile || dataItem_phoneNumber,
                  hobby: hobby || dataItem_hobby,
                },
              ],
            },
          };
          const postData = JSON.stringify(jsonData);
          console.log(postData);
          const http_options = {
            hostname: "127.0.0.1",
            port: 1337,
            path: "/api/" + uid,
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(postData),
            },
          };
          const req = http.request(http_options, (res) => {
            res.on("data", () => {
              console.log(
                `更新条目: 姓名:${name}, 学号:${id}, 手机号:${mobile}, 兴趣爱好:${hobby}`
              );
            });
          });
          req.on("error", (error) => {
            console.error(error);
          });
          req.write(postData); // 使用write方法将数据写入请求的主体
          req.end();
        });
      });
      req_get.on("error", (error) => {
        console.error(error);
      });
      req_get.end();
    }
  }

  //列表查看
  if (options.list) {
    if (!options.list) {
      mode = "descend";
    } else {
      const { mode } = options;
    }
    // 调用 API
    const http_options_get = {
      hostname: "127.0.0.1",
      port: 1337,
      path: "/api/",
      method: "GET",
    };
    const req_get = http.request(http_options_get, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        const data = JSON.parse(responseData);
        const items = data.collection.items;
        // 按照date_posted字段对项进行排序
        const sortedItems = items.slice().sort((a, b) => {
          const dateA = new Date(
            a.data.find((item) => item.name === "date_posted").value
          );
          const dateB = new Date(
            b.data.find((item) => item.name === "date_posted").value
          );
          return dateA - dateB;
        });
        let output = [];
        for (let i = 0; i < sortedItems.length; i++) {
          const data_id=sortedItems[i].href
          const dataItem_username = sortedItems[i].data.find(
            (item) => item.name === "username"
          ).value;
          const dataItem_IdNumber = sortedItems[i].data.find(
            (item) => item.name === "IdNumber"
          ).value;
          const dataItem_email = sortedItems[i].data.find(
            (item) => item.name === "email"
          ).value;
          const dataItem_phoneNumber = sortedItems[i].data.find(
            (item) => item.name === "phoneNumber"
          ).value;
          const dataItem_hobby = sortedItems[i].data.find(
            (item) => item.name === "hobby"
          ).value;
          out={
            href:data_id,
            username:dataItem_username,
            IdNumber:dataItem_IdNumber,
            email:dataItem_email,
            phoneNumber:dataItem_phoneNumber,
            hobby:dataItem_hobby
          } 
          output.push(out);
        }
        console.table(output);
      });
    });
    req_get.on("error", (error) => {
      console.error(error);
    });
    req_get.end();
  }
}

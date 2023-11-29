const { Command } = require("commander");
const program = new Command();

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
    "-l, --list <mode>",
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
if (count != 1) {
  console.log(`Error!  "add","delete","updata","list"互斥！！！`);
} else {

  //方法实现

  //添加
  if (options.add) {
    if (!(options.name && options.id && options.mobile && options.hobby)) {
      console.log(`参数缺失，请保证：--name --id --mobile --hobby的具备！`);
    }
    const { name, id, mobile, hobby } = options;
    // 调用 API

    // 消息响应
    console.log(
      `添加新条目: 姓名:${name}, 学号:${id}, 手机号:${mobile}, 兴趣爱好:${hobby}`
    );
  }

  //删除
  if (options.delete) {
    const { uid } = options;
    // 调用 API
    // 在这里补充调用 API 的代码，使用 name、id、mobile 和 hobby 参数
    console.log(`删除记录${uid}`);
  }

  //更新
  if (options.update) {
    if (!(options.name || options.id || options.mobile || options.hobby)) {
      console.log(
        `参数缺失，请保证：--name --id --mobile --hobby任意参数的具备！`
      );
    }
    const name = options.name;
    const id = options.id;
    const mobile = options.mobile;
    const hobby = options.hobby;
    // 调用 API
  }

  //列表查看
  if (options.list) {
    if (!options.list) {
      mode = "descend";
    } else {
      const { mode } = options;
    }
    // 调用 API
  }
}

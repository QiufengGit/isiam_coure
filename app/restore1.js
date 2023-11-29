const { Command } = require('commander'); // (normal include)
// const { Command } = require('../'); // include commander in git clone of commander repo
const program = new Command();

// This is used as an example in the README for the Quick Start.

program
  .description('信息系统集成与管理课程实习')//Information Systems Integration and Management Course Internship
  .version('0.8.0')
  .option('-a, --add', '增加⼀条新的条⽬，如果成功，输出成功的消息；如果失败，输出失败的警告。\
  该选项需要配合下列选项(需4个同时联合使⽤)：\
  -n|--name={增加的姓名}\
  -i| --id={增加的学号}\
  -m|--mobile={增加的⼿机号}\
   b|--hobby={增加的兴趣爱好}')
  .option('-n, --name <name>', '姓名')
  .option('-i, --id <id>', '学号')
  .option('-m, --mobile <mobile>', '手机号')
  .option('-b, --hobby <hobby>', '兴趣爱好')

  .option('-d, --delete <id>', '对编号id的条⽬删除操作。如果成功，输出成功的消息；如果失败，输出失败的警告')
  .option('-u, --update <id>','对编号id的条⽬修改内容。如果成功，输出成功的消息；如果失败，输出失败的警告。\
  该选项需要配合下列选项(可独⽴，也可组合使⽤)：\
  -n|--name={更新后的姓名}:\
  -i| --id={更新后的学号}:\
  -m|--mobile={更新后的⼿机号}\
  -b|--hobby={更新后的兴趣爱好}')
  .option('-l, --list <mode>', '当mode是“descend”时【默认】，降序排列；当mode是“ascend”时，升序排列。输出到终端显示。');


program.parse();

if (program.add) {
  if (!program.name || !program.id || !program.mobile || !program.hobby) {
    console.error('必须提供姓名、学号、手机号和兴趣爱好才能添加一条新条目。');
    process.exit(1);
  }
}
// Try the following:
//    node string-util
//    node string-util help split
//    node string-util split --separator=/ a/b/c
//    node string-util split --first a,b,c
//    node string-util join a b c d
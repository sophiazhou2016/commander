export default function numFormat(num){
  let res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
      return $1+",";
    });
  });
  return res;

}

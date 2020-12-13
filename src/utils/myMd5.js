import md5 from 'md5'
let myFlag = 'myEmail=1114887953@qq.com/myName=pengguodon/myAge=18'
function myEncrypt (passwordStr){
    return md5(md5(passwordStr+myFlag))
}
export default myEncrypt
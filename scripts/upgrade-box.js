// manual way

const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin") // What is the point of the box proxy admin if its still controlled by one address? shouldn't it be controlled by a multisig wallet or DAO?
    const transparentProxy = await ethers.getContract("Box_Proxy")

    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    let version = await proxyBoxV1.version()
    console.log(version)

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    version = await proxyBoxV2.version()
    console.log(version)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

const {expect} = require(`chai`);
const {ethers} = require("hardhat");


describe(`Token Contract `, () => {
    let Token, token, owner, addr1, addr2;

    beforeEach(async () => {
        Token = await ethers.getContractFactory(`Token`);
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    })

    describe(`Deployment `, () => {
        it('Should set the right owner', async () => {
            expect(await token.owner()).to.equal(owner.address);
        });
        it('Should assign the total supply of tokens to the  right owner', async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    })
})


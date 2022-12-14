const {expect} = require(`chai`);
const {ethers} = require("hardhat");
const {impliesNoTimeouts} = require("mocha/lib/cli/node-flags");


describe(`Token Contract Testing`, () => {
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
    });

    describe(`Transactions Testing`, () => {
        it('should transfer tokens between accounts', async () => {
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.eq(50);

            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.eq(50);
        });

        it('should fail if user had enough tokens', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await expect(token.connect(addr1).transfer(owner.address, 1))
                .to.be.revertedWith(`Not enough tokens`);

            expect(await token.balanceOf(owner.address)).to.eq(initialOwnerBalance);
        });

        it('should update properly after transfers', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await token.transfer(addr1.address, 100);
            await token.transfer(addr2.address, 50);

            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.eq(initialOwnerBalance - 150);

            const addr1Balance = await token.balanceOf(addr1.address);
            const addr2Balance = await token.balanceOf(addr2.address);

            expect(addr1Balance).to.eq(100);
            expect(addr2Balance).to.eq(50);
        });
    })
})


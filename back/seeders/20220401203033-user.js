'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "test1",
        user_id: "test1",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x75bdf33d2e1bae409c825bc7825122c00e0ebcaf",
        private_key: "652a0773e107cc591d1490d7503df1a1cce6ff9ec1c30806658cbc54c0a763eb",
        total_sales: 117,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test2",
        user_id: "test2",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x501cac329e9e0166c8540186d9a78f3617d0072c",
        private_key: "ec017e60b998ee824db254ca3eabbeaa66995f1d953771e0e3ee55c02e5ee013",
        total_sales: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "test3",
        user_id: "test3",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x3b997ca4a4b7b061614aa1ee034d0014dfc9c82c",
        private_key: "fd490df907dc6ebe8e6698b428fab356acc39659e41e76e709c1326c9301077f",
        total_sales: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test4",
        user_id: "test4",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x5c1365aec7992f3b4e1dd477dad1e3f4efac6244",
        private_key: "ec14b15b7471049d524cf8133ec7c42fad2d87e41b5bc86889bde6156815e60e",
        total_sales: 233,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test5",
        user_id: "test5",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0xe4d3fadde59f7bab6716594846bf8c55e928393b",
        private_key: "f87be2e9c56deb4b923c2497c282e2f4f48db763b93f59864ab7d9d0b1b7f459",
        total_sales: 310,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test6",
        user_id: "test6",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x2898e1b786e9ede44320c7107c05151412cba72b",
        private_key: "435eb783b3afc7cff6c8fa15f9947be219e441f3fff9c70aac1a817d554889de",
        total_sales: 78,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test7",
        user_id: "test7",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x3cd028ed6db76139cbf70b621649be1a5f2e444c",
        private_key: "fe3b4a914972077292ba36084bb5a4c9d56331bad3df012f068192b30ea83124",
        total_sales: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test8",
        user_id: "test8",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x69650b79745f029d0483746326fa41af7f9aeecb",
        private_key: "0f5797a938765b3878312ba34c3db0c44caec3da63705b67cfa61e8045782fc4",
        total_sales: 1110,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test9",
        user_id: "test9",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0xeb82c58451a338968aea818c27523c3aeb095cb7",
        private_key: "c48be9613c5e4cb0fd37ed0913adf8c7156c6db9e2f75e35bc017aa2f1a2cb6d",
        total_sales: 411,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test10",
        user_id: "test10",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0xe73d5eff99db5d88451d50e83fff32f3214d8dae",
        private_key: "f37b1ae0ca86aca4a583e9df1166e40075ee74841c6f59fb31e189bdbe27bfb2",
        total_sales: 775,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test11",
        user_id: "test11",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x0facab373386dcfa294fc25922974b99f507fae0",
        private_key: "315684ab1d1b8133c77dc1e49f3b8a4ff99f02c28227dd6a27fc2d72cfbf13cf",
        total_sales: 855,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test12",
        user_id:"test12",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x253fbf2d4fb4cf3f01b78ed5d97c90205b332dde",
        private_key: "d549df3149aa90b8b2b3eaf204ad8091217e48878969def7cfaed5ce49ab6a82",
        total_sales: 127,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test13",
        user_id: "test13",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x1cc69e4b5b1fc165e14f9336a78153505501f96a",
        private_key: "26903923b63a3756bea028225875dea414086ee1a6c6e4b809988edadc528169",
        total_sales: 88,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test14",
        user_id: "test14",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0xdbe8e5e8194ebf6c1003ed93752bf649ac7d0c8f",
        private_key: "bc28c1babc760859d37a628bb3b2480c018cce5bb6e524b87abb0fb6fc85d145",
        total_sales: 72,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test15",
        user_id: "test15",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x2b9f919b3e0dea4059dc0c2213f8dc39dcf5f994",
        private_key: "5191cdf24abc96fb04795e56bd042887cc63d2dfecf9739d99a93306f5c91996",
        total_sales: 36,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test16",
        user_id: "test16",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x8afb866e727a90ba97d5dab9cfd45adff3091ac8",
        private_key: "b7f16636218935ddee6250c134beb1a783c4c6d9a676429c15df8e3164dca753",
        total_sales: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test17",
        user_id: "test17",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0xbc60b5f293a74f1f1297ba0cce6fee53d88c6fac",
        private_key: "f4c7eaf82ccb4c10da9e095bd5944a92652dce96d505e8d02569bccc4f13c70b",
        total_sales: 48,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test18",
        user_id:"test18",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x7aa708c7bba2a7c51dd9eabaea8268becff2b6bb",
        private_key: "8de655aa153bcecd03256e504ca7acca143fc98a8d02fef25de54a312de5480f",
        total_sales: 73,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test19",
        user_id: "test19",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0x5397490bd05267ebc78123fa5c91ce9999300c72",
        private_key: "79442cc80a0e0cc966d9a9b7edfcf5dd95cc18ca9aca89ef7ea601c250913070",
        total_sales: 66,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "test20",
        user_id: "test20",
        password: "@!DKJ@#!JK!@KJ132",
        balance: 0,
        donation_balance: 0,
        address: "0xef0bb23831e7ae81f3f2b595c6362defa4c124f2",
        private_key: "adfe48a5bb3454ef7b06cb2eed2f9f807665119d38b538cfbcfb49c38fea0872",
        total_sales: 158,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await  queryInterface.bulkDelete('artworks', null, {});
  }
};
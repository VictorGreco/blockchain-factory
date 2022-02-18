const Block = require('../src/block');

describe('Block', () => {
    it('should create a new block', () => {
        const block = new Block('test');
        const block2 = new Block(123123);
        const block3 = new Block({ test: 123, test2: 'test' });

        expect(block instanceof Block).toBeTruthy();
        expect(block.timestamp).toEqual(expect.any(Number));
        expect(block.body).toEqual('test');
        expect(block2.body).toEqual(123123);
        expect(block3.body).toEqual({ test: 123, test2: 'test' });
    });
    

    it('should create a non refined new block', () => {
        const block = new Block('test');

        expect(block.isRefined()).toBeFalsy();
    });

    it('should refine block', () => {
        const block = new Block('test');

        block.refine({ height: 1, previousBlockHash: '0' });

        expect(block.height).toEqual(1);
        expect(block.previousBlockHash).toEqual('0');
        expect(block.isRefined()).toBeTruthy();
        expect(block.hash.length).toEqual(64);
    });

    it('should get block header', () => {
        const block = new Block('test');

        block.refine({ height: 1, previousBlockHash: '0' });

        expect(block.getHeader()).toEqual({
            height: 1,
            timestamp: expect.any(Number),
            previousBlockHash: '0',
            hash: block.hash
        });
    })

    it('should get block body', () => {
        const block = new Block('test');

        block.refine({ height: 1, previousBlockHash: '0' });

        expect(block.getBody()).toEqual('test');
    })
});
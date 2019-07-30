import XTemplate from '../../../packages/xtemplate';

describe('each', () => {
  it('support foreach', () => {
    const tpl = '{{#foreach(data, "v", "i")}}{{i}}: {{v}}{{/foreach}}';
    const data = {
      data: [1, 2],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('0: 11: 2');
  });

  it('this will prevent up resolve', () => {
    const tpl = '{{#each (data)}}{{this.title}}{{/each}}';
    const data = {
      title: '2',
      data: [{ title2: '1' }],
    };

    const render = new XTemplate(tpl).render(data);

    expect(render).toEqual('');
  });

  it('this will prevent up resolve -2', () => {
    const tpl = '{{#each (data)}}{{this["title"]}}{{/each}}';
    const data = {
      title: '2',
      data: [{ title2: '1' }],
    };

    const render = new XTemplate(tpl).render(data);

    expect(render).toEqual('');
  });

  it('support forin', () => {
    const tpl = '{{#forin (data)}}{{r}}{{xindex}}:{{this}}{{/forin}}';
    const data = {
      r: '!',
      data: {
        x: 1,
        y: 2,
      },
    };

    const render = new XTemplate(tpl).render(data);

    expect(render).toEqual('!x:1!y:2');
  });

  it('support null as array element', () => {
    const tpl = '{{#each (data)}}{{xindex}}:{{this}}{{/each}}';
    const data = {
      data: [null],
    };

    const render = new XTemplate(tpl).render(data);

    expect(render).toEqual('0:');
  });

  it('support access parent scope', () => {
    const tpl = '{{#each (data)}}{{r}}{{xindex}}:{{this}}{{/each}}';
    const data = {
      r: '!',
      data: {
        x: 1,
        y: 2,
      },
    };

    const render = new XTemplate(tpl).render(data);

    expect(render).toEqual('!x:1!y:2');
  });

  it('support xindex name', () => {
    const tpl = '{{#each(data, "v", "i")}}{{i}}: {{v}}{{/each}}';
    const data = {
      data: [1, 2],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('0: 11: 2');
  });

  it('support value name', () => {
    const tpl = '{{#each (data, "v")}}{{xindex}}: {{v}}{{/each}}';
    const data = {
      data: [1, 2],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('0: 11: 2');
  });

  it('support nest array', () => {
    const tpl = '{{#each (data)}}{{this[0]}}{{this[1]}}{{this}}{{/each}}';
    const data = {
      data: [[1, 2]],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('121,2');
  });

  it('support each object', () => {
    const tpl = '{{#each (data)}}{{xindex}}:{{this}}{{/each}}';
    const data = {
      data: {
        x: 1,
        y: 2,
      },
    };

    const render = new XTemplate(tpl).render(data);

    expect(render).toEqual('x:1y:2');
  });

  it('allow empty content', () => {
    let tpl = '{{#each (l)}}{{/each}}';

    let data = {
      x: [
        {
          title: 5,
        },
      ],
    };

    let render = new XTemplate(tpl).render(data);

    expect(render).toEqual('');

    tpl = '{{#each( x)}}{{/each}}';

    data = {
      x: [
        {
          title: 5,
        },
      ],
    };

    render = new XTemplate(tpl).render(data);

    expect(render).toEqual('');
  });

  it('support variable as index', () => {
    const tpl = '{{#each (data[d])}}{{this}}{{/each}}';
    const data = {
      data: {
        my: [1, 2],
      },
      d: 'my',
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('12');
  });

  it('ignore if not found', () => {
    const tpl = '{{#each( l)}}{{title}}{{/each}}';
    const data = {
      x: [
        {
          title: 5,
        },
      ],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('');
  });

  it('support array as render parameter', () => {
    const tpl = '!{{#each (this)}}{{this}}-{{/each}}!';
    const data = [1, 2];
    const render = new XTemplate(tpl, data).render(data);
    expect(render).toEqual('!1-2-!');
  });

  it('support object in array', () => {
    const tpl = '{{#each( data)}}{{name}}-{{xindex}}/{{xcount}}|{{/each}}';
    const data = {
      data: [
        {
          name: 1,
        },
        {
          name: 2,
        },
      ],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('1-0/2|2-1/2|');
  });

  it('support simple array', () => {
    const tpl = '{{#each (data)}}{{this}}-{{xindex}}/{{xcount}}|{{/each}}';
    const data = {
      data: [1, 2],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('1-0/2|2-1/2|');
  });

  it('support nested each', () => {
    const tpl =
      '{{#each (outer)}}{{t}}{{#each (inner)}}{{this}}{{/each}}{{/each}}';
    const data = {
      outer: [
        {
          t: 1,
          inner: [11, 12],
        },
        {
          t: 2,
          inner: [21, 22],
        },
      ],
    };
    const render = new XTemplate(tpl).render(data);
    expect(render).toEqual('1111222122');
  });

  describe('range', () => {
    it('check error', () => {
      const tpl = '{{#each(range(0,"3"))}}{{this}}{{/each}}';
      expect(() => {
        new XTemplate(tpl).render({});
      }).toThrowError(/start\/end\/step of range must be type number!/);
    });
    it('support ascending order', () => {
      const tpl = '{{#each(range(0,3))}}{{this}}{{/each}}';
      const render = new XTemplate(tpl).render({});
      expect(render).toEqual('012');
    });

    it('support descending order', () => {
      const tpl = '{{#each(range(3,0))}}{{this}}{{/each}}';
      const render = new XTemplate(tpl).render({});
      expect(render).toEqual('321');
    });

    it('can specify step', () => {
      const tpl = '{{#each(range(5,0,-2))}}{{this}}{{/each}}';
      const render = new XTemplate(tpl).render({});
      expect(render).toEqual('531');
    });

    it('can specify step', () => {
      const tpl = '{{#each(range(0,5,2))}}{{this}}{{/each}}';
      const render = new XTemplate(tpl).render({});
      expect(render).toEqual('024');
    });
  });
});

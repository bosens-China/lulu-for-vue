import { encode } from '../utils/code';
import type { Plugin } from './index';

const table = (): Plugin => ($) => {
  // table可能存在多个
  const tableAll = $('table');
  tableAll.each((_index, el) => {
    const th = $(el).find('thead tr th');
    const tr = $(el).find('tbody tr');
    const columns: Array<{
      title: string;
      dataIndex: string;
    }> = [];
    const dataSource: Array<Record<string, any>> = [];
    th.each((index, thEl) => {
      columns.push({
        title: $(thEl).text(),
        dataIndex: `key${index}`,
      });
    });
    tr.each((index, trEL) => {
      const td = $(trEL).find('td');
      const obj: Record<string, any> = {};
      td.each((_, tdEl) => {
        obj[`key${_}`] = $(tdEl).html();
        obj.key = `${index}_${_}`;
      });
      dataSource.push(obj);
    });

    $(el).replaceWith(
      `<demo-table datasource="${encode(dataSource)}" columns="${encode(columns)}" />`,
    );
  });
};

export default table;

<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="handlePageChange"
    :loading="loading"
    rowKey="id"
  >
    <template #action="{}">
      <a-button>编辑</a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePage } from '@/utils/hooks';
import { listUser } from '@/api/auth/user';
import { User, PageModel } from '@/models';
export default defineComponent({
  name: 'UserView',
  data() {
    return {
      columns: [
        {
          dataIndex: 'username',
          title: '昵称'
        },
        {
          dataIndex: 'avatar',
          title: '头像'
        },
        {
          dataIndex: 'phone',
          title: '电话'
        },
        {
          dataIndex: 'email',
          title: '邮箱'
        },
        {
          dataIndex: 'created_at',
          title: '创建时间'
        }
      ]
    };
  },
  setup() {
    // setup
    const page = usePage();
    const tableData = ref<User[]>([]);
    const loading = ref(false);
    const getTableData = async () => {
      loading.value = true;
      const { issuccess, data } = await listUser(page.current, page.pageSize);
      if (issuccess) {
        tableData.value = data.rows;
        page.total = data.count;
      }
      loading.value = false;
    };
    // getTableData();
    const handlePageChange = (nowpage: PageModel) => {
      page.current = nowpage.current;
      page.pageSize = nowpage.pageSize;
      getTableData();
    };
    return {
      page,
      tableData,
      handlePageChange,
      loading
    };
  }
});
</script>

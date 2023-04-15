import React, { useEffect, useState } from "react";
import { SortOrder, TableChangeState, TableChangeType } from "react-bootstrap-table-next";
import { ChevronDown, ChevronExpand, ChevronUp } from "react-bootstrap-icons";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import axios from "axios";
import NoDataIndication from "../components/NoDataIndication/NoDataIndication";
import { i18n } from "../assets/i18next/i18n";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";
import { showErrorResponses } from "../utils/showErrorResponses";

interface UseTablePropsConfig {
  initialSortBy?: string;
  params?: Record<string, any>;
}

const useTableProps = <T extends {}>(url: string, config?: UseTablePropsConfig) => {
  const { initialSortBy = '', params } = config || {};
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortDir, setSortDir] = useState<SortOrder>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: resData } = await axios.get(
          url,
          {
            params: {
              ...params,
              page: currentPage,
              pageLimit: limit,
              sortDir,
              sortBy,
            },
          },
        );

        if (resData?.content?.length === 0 && currentPage !== 1) {
          setCurrentPage(1)
        }
        setData(resData?.content || []);
        setTotal(resData?.totalCount || 0);
      } catch (e) {
        showErrorResponses(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData().catch();
  }, [currentPage, limit, sortBy, sortDir, url, params]);
  const sortHandler = (order?: string) => {
    if (!order) return <ChevronExpand className='sort-icons-spacing'/>;
    if (order === 'asc') return <ChevronUp className='sort-icons-spacing'/>;
    return <ChevronDown className='sort-icons-spacing'/>;
  }

  const paginate = paginationFactory({
    sizePerPageList: [
      { text: '10', value: 10 },
      { text: '25', value: 25 },
      { text: '50', value: 50 },
      { text: '100', value: 100 }],
    page: currentPage,
    sizePerPage: limit,
    totalSize: total,
    hidePageListOnlyOnePage: true,
    hideSizePerPage: !data[0],
  })

  const onTableChange = async (type: TableChangeType, tableChangeState: TableChangeState<object>) => {
    setCurrentPage(tableChangeState.page);
    setLimit(tableChangeState.sizePerPage);
    setSortBy(tableChangeState.sortField);
    setSortDir(tableChangeState.sortOrder);
  };

  const tableProps: {data: unknown[]} & Record<string, unknown> = {
    remote: true,
    bootstrap4: true,
    data,
    pagination: paginate,
    filter: filterFactory(),
    onTableChange,
    wrapperClasses: "table-responsive",
    striped: !!data[0],
    hover: true,
    bordered: false,
    sort: {
      order: sortDir,
      sortCaret: sortHandler,
    },
  }

  if(loading){
    tableProps.overlay = () => LoadingSpinner
  }else{
    tableProps.noDataIndication = <NoDataIndication text={i18n.t('orders.noDataIndication')}/>
  }

  return { tableProps, setData, setLoading, setTotal, sortBy, currentPage, limit, sortDir, data, loading, total };
};

export default useTableProps;

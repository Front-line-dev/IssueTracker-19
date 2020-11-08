import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import { Header, IssueList, IssueSearchBox } from '@components';
import { numerics } from '@styles/variables';
import { issueService } from '@services';

const IssueContainer = styled.div`
  ${`width: calc(100% - ${numerics.marginHorizontal} * 2)`};
  margin: ${numerics.marginHorizontal};
`;

export const initialFilterOptions = {
  isOpened: 1,
  author: null,
  label: [],
  milestone: null,
  assignee: null,
  keyword: null,
};

export const IssueContext = createContext();

export default function Issue() {
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [issues, setIssues] = useState([]);
  const allChecked = issues.every(i => i.checked) && issues.length;
  const markMode = issues.some(i => i.checked);

  const setFilterdIssues = async options => {
    try {
      const {
        data: { issues },
        status,
      } = await issueService.getIssues(options);
      if (status === 200) {
        setIssues(issues.map(issue => ({ ...issue, checked: false })));
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        history.push('/login');
      }
      console.error(err);
    }
  };

  useEffect(() => {
    setFilterdIssues(filterOptions);
  }, [filterOptions]);

  return (
    <IssueContext.Provider value={{ filterOptions, setFilterOptions }}>
      <Header />
      <IssueContainer>
        <IssueSearchBox />
        <IssueList
          issues={issues}
          setIssues={setIssues}
          allChecked={allChecked}
          markMode={markMode}
        />
      </IssueContainer>
    </IssueContext.Provider>
  );
}

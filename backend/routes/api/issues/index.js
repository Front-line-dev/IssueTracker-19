import express from 'express';
import * as issuesController from './issues.controller';
import issueNoRouter from './[no]';

const router = express.Router({ mergeParams: true });

router.use('/:no', issueNoRouter);

router.get('/', issuesController.getIssues);
router.post('/', issuesController.addIssue);

export default router;

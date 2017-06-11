import { ClPlannerPage } from './app.po';

describe('cl-planner App', () => {
  let page: ClPlannerPage;

  beforeEach(() => {
    page = new ClPlannerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

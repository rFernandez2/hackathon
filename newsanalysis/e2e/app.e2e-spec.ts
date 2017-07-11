import { NewsanalysisPage } from './app.po';

describe('newsanalysis App', () => {
  let page: NewsanalysisPage;

  beforeEach(() => {
    page = new NewsanalysisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

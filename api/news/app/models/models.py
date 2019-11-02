from newsapi import NewsApiClient

class newsClient(object):
    def __init__(self):
        self.newsapi = NewsApiClient(api_key='2c7cac11080449ce967568f8c43023be')

    def searchNews(self, query, lang = 'en'):
        res = self.newsapi.get_everything(q=query,
                                    sort_by='popularity',
                                    language=lang,
                                    )
        return res

    def getHeadlinesCountry(self, country, lang = 'en'):
        res = self.newsapi.get_top_headlines(country=country,
                                            language=lang)
        return res

    def getHeadlines(self, query, lang = 'en'):
        res = self.newsapi.get_top_headlines(q=query,
                                            language=lang)
        return res
import nltk
import numpy as np
import math
import newspaper
from newspaper import news_pool

with open("./working_sites.txt", "r+") as file:
    import csv
    reader = csv.reader(file, delimiter=',')
    sources = []
    for r in reader:
        sources.extend(r)

def get_articles():
    papers = []
    for source in sources:
        papers.append(newspaper.build(source, memoize_articles=False))
    news_pool.set(papers, threads_per_source=int(8 / len(sources)))
    news_pool.join()

    print(papers[0].articles[5].html)
    
    return source


def 

import nltk
import numpy as np
import pandas as pd
import math
import csv
import json
import tldextract
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
    
    return papers


def analyze_articles(sources):
    keywords = []
    articles = []
    for source in sources:
        articles.extend(source.articles)
    for article in articles:
        article.parse()
        article.nlp()    

    print("Performing Sentiment Analysis")
    sentiments = ez_sentiment(articles) 
    for article, sentiment in zip(articles, sentiments):
        keywords.append([tldextract.extract(article.url).domain] + [article.title] + [article.url] + [article.top_image] + [round(sentiment, 2)] +  list(set(article.keywords)))
    
    df = pd.DataFrame(keywords).drop_duplicates(subset=[0, 3])
    keywords = df.values.tolist()

    with open("./keywords.csv", "w+") as file:
        writer = csv.writer(file)
        writer.writerows(keywords)
    return keywords
    

def read_keywords():
    keywords = []
    with open("./keywords.csv", "r+") as file:
        reader = csv.reader(file)
        for row in reader:
            keywords.append(row)
    return keywords

def categorize_articles():
    categories = []
    with open("./key_maps.csv", "r+") as file:
        reader = csv.reader(file, delimiter=",")
        for row in reader:
            categories.append(row)
    num_categories = len(categories)
 
    with open("./keywords.csv", "r+") as file:
        reader = csv.reader(file, delimiter=",")
        articles = []
        for row in reader:
            articles.append(row)
    categories_pred = []
    for article in articles:
        scores = np.zeros(num_categories)
        for a_key in article[5:]:
            for i, category in enumerate(categories):
                for c_key in category[1:]:
                    if c_key == a_key:
                        print(c_key)
                        scores[i] = scores[i] + 1
        # print(scores)
        if not any(scores) or sum(scores) <= 1:
            categories_pred.append(-1)
        else:
            categories_pred.append(categories[np.argmax(scores)][0])
    full_data = []
    for entry, cat in zip(articles, categories_pred):
        if cat != -1:
            full_data.append(entry + [cat])
    return full_data


def toJson(data):
    f_data = [t[:5] + [t[-1]] for t in data]
    dicts = [dict(zip(['brand', 'title', 'url', 'image_url', 'sentiment', 'category'], t)) for t in f_data]
    with open("./article_data.json", 'w+') as file:
        file.write('{ \"articles\":')
        json.dump(dicts, file)
        file.write('}')
    return dicts


def div0(x, y):
    if y != 0:
        return x /y
    else:
        return 0


def ez_sentiment(articles):
    positive = []
    negative = []
    with open("./positive_words.csv", "r+") as file:
        reader = csv.reader(file)
        for row in reader:
            positive.append(row[0].lower())
    with open("./negative_words.csv", "r+") as file:
        reader = csv.reader(file)
        for row in reader:
            negative.append(row[0].lower())
    
    file = open("./word_vals.csv", "w+")
    writer = csv.writer(file)
    sentiments = []
    counts = []
    for article in articles:
        num_pos = 0
        num_neg = 0
        num_words = 0
        for a_word in article.text.lower().split():
            word_found =  0
            if a_word in positive:
                num_pos += 1
            if a_word in negative:
                num_neg += 1
            num_words += 1
        if num_words < 100:
            num_pos = num_neg = 0
        counts.append([num_pos, num_neg, num_words, div0(num_pos, num_words), div0(num_neg, num_words)])
        writer.writerow([num_pos, num_neg, num_words])
        
    file.close()
    
    maxs = np.max(counts, axis=0)
    maxs = np.array([t if t != 0 else 1 for t in maxs])
    norm_counts = np.array(counts) / maxs

    for value in norm_counts:
        if value[3] > value[4] and value[0] > 0:
            sentiments.append(value[3] * 5 + .5)
        elif value[4] > value[3] and value[1] > 0:
            sentiments.append(value[4] * -5 + .5)
        else:
            sentiments.append(0)

    return sentiments


def run():
    print("Getting Articles")
    sources = get_articles()
    print("Analyzing Articles")
    keys = analyze_articles(sources)
    print("Categorizing Articles")
    data = categorize_articles()
    print("Generating JSON")
    return toJson(data)

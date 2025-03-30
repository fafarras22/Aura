
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, ArrowRight, ExternalLink, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// News Article interface
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  category: 'Company' | 'Industry' | 'Technology' | 'Investment';
  image: string;
  featured?: boolean;
  tags: string[];
}

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredArticles = searchQuery 
    ? newsArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : newsArticles;
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">AKAR News & Updates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay up to date with the latest from AKAR, the container farming industry, and blockchain innovation.
          </p>
        </section>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search news and articles..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Featured News */}
        {!searchQuery && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Featured News</h2>
            {newsArticles.filter(article => article.featured).map(article => (
              <FeaturedNewsCard key={article.id} article={article} />
            ))}
          </section>
        )}
        
        {/* All News */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{searchQuery ? 'Search Results' : 'Latest News'}</h2>
            {searchQuery && filteredArticles.length > 0 && (
              <p className="text-muted-foreground">Found {filteredArticles.length} results for "{searchQuery}"</p>
            )}
          </div>
          
          {searchQuery && filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any articles matching your search query.
              </p>
              <Button onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="industry">Industry</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="company" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.filter(article => article.category === 'Company').map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="industry" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.filter(article => article.category === 'Industry').map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technology" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.filter(article => article.category === 'Technology').map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="investment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.filter(article => article.category === 'Investment').map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </section>
        
        {/* Newsletter Signup */}
        <section className="bg-muted p-8 rounded-xl text-center space-y-4">
          <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get the latest news, updates, and insights from AKAR delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <Input placeholder="Enter your email address" className="flex-grow" />
            <Button>Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

// Featured News Card Component
const FeaturedNewsCard = ({ article }: { article: NewsArticle }) => {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="h-full">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="outline">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {article.date}
              </div>
            </div>
            <CardTitle className="text-2xl">{article.title}</CardTitle>
            <p>{article.summary}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            <Button className="gap-2 w-full">
              Read Full Article <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// News Card Component
const NewsCard = ({ article }: { article: NewsArticle }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline">{article.category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {article.date}
          </div>
        </div>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription>By {article.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="ghost" className="gap-2 w-full">
          Read More <ExternalLink className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Mock news articles
const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'AKAR Secures $5M in Series A Funding to Expand Container Farming Network',
    summary: "Led by Antler and supported by leading Indonesian investors, this funding will accelerate AKAR's expansion across Southeast Asia.",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'November 15, 2023',
    author: 'AKAR Communications Team',
    category: 'Company',
    image: '/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png',
    featured: true,
    tags: ['Funding', 'Expansion', 'Investment']
  },
  {
    id: '2',
    title: 'Introducing the Next Generation of AKAR Container Farms: More Efficient, More Sustainable',
    summary: 'Our newly redesigned container farms use 30% less energy while increasing crop yield by 15%, setting a new standard for efficient urban farming.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'October 8, 2023',
    author: 'Development Team',
    category: 'Technology',
    image: '/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png',
    tags: ['Innovation', 'Sustainability', 'Product Launch']
  },
  {
    id: '3',
    title: 'AKAR Partners with Indodax to Enhance Blockchain Tokenization Platform',
    summary: "This strategic partnership will improve liquidity and accessibility for AKAR token holders while strengthening Indonesia's blockchain ecosystem.",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'September 22, 2023',
    author: 'Partnerships Team',
    category: 'Investment',
    image: '/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png',
    tags: ['Partnership', 'Blockchain', 'Tokenization']
  },
  {
    id: '4',
    title: 'Global Food Security Report Highlights Container Farming as Key Solution',
    summary: 'A new UN report identifies containerized farming solutions like AKAR as critical innovations to address food security challenges in developing regions.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'August 15, 2023',
    author: 'Research Team',
    category: 'Industry',
    image: '/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png',
    tags: ['Food Security', 'Sustainability', 'Research']
  },
  {
    id: '5',
    title: 'AKAR Opens New Research & Development Center in Bandung',
    summary: 'The state-of-the-art facility will focus on developing next-generation vertical farming technology and sustainable agricultural solutions.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'July 30, 2023',
    author: 'AKAR Communications Team',
    category: 'Company',
    image: '/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png',
    tags: ['R&D', 'Innovation', 'Expansion']
  },
  {
    id: '6',
    title: 'How Blockchain is Revolutionizing Agricultural Investment',
    summary: 'Tokenization platforms like AKAR are democratizing access to agricultural investments while providing unprecedented transparency and liquidity.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'July 12, 2023',
    author: 'Blockchain Team',
    category: 'Investment',
    image: '/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png',
    tags: ['Blockchain', 'Investment', 'Innovation']
  },
  {
    id: '7',
    title: 'Climate Change and the Future of Farming: Why Controlled Environment Agriculture Matters',
    summary: "As traditional farming faces increasing challenges from climate change, solutions like AKAR's container farms offer resilience and stability.",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'June 25, 2023',
    author: 'Sustainability Team',
    category: 'Industry',
    image: '/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png',
    featured: true,
    tags: ['Climate Change', 'Sustainability', 'Future of Farming']
  },
  {
    id: '8',
    title: 'AKAR Launches Advanced Farm Management Dashboard with AI Integration',
    summary: 'The new cloud-based platform leverages artificial intelligence to optimize growing conditions and predict maintenance needs for container farms.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'June 10, 2023',
    author: 'Technology Team',
    category: 'Technology',
    image: '/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png',
    tags: ['AI', 'Technology', 'Farm Management']
  }
];

export default News;

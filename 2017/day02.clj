(require '[clojure.string :as str])

(def normalised-data
    (->> (slurp "2017/inputs/day02.txt")
         str/split-lines
         (map #(map read-string (clojure.string/split % #"\t")))))

(defn get-diff [lst] 
    (let [mx (apply max lst)
          mn (apply min lst)]
          (- mx mn)))

;pt 1:
(reduce + (map get-diff normalised-data))

